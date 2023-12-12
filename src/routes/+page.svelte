<script>
    import { create2DArray } from "../lib/utils";
    import InteractiveCell from "../lib/components/InteractiveCell.svelte";
    import Highlight from "svelte-highlight";
    import cpp from "svelte-highlight/languages/cpp";
    import github from "svelte-highlight/styles/github";
    import { toasts, ToastContainer, FlatToast, BootstrapToast }  from "svelte-toasts";

    let width = 12;
    let height = 7;

    $: cells = create2DArray(width, height);

    $: generatedCode = `const std::vector<int> map = {${generateMatrixString(cells)}};`;

    function handleCellToggle(e) {
        const { x, y } = e.detail;
        cells[y][x] = cells[y][x] == 0 ? 1 : 0;
    }

    function generateMatrixString(cells) {
        let matrixString = "\n\t";

        cells.forEach((row) => {
            row.forEach((cell) => {
                matrixString += `${cell},`;
            })
            matrixString += "\n\t"
        })

        matrixString = matrixString.slice(0, -3);
        matrixString += "\n"

        return matrixString;
    }
</script>

<svelte:head>
  {@html github}
</svelte:head>

<div class="w-100 flex justify-center">
    <div class="flex flex-col text-xl w-72 select-none">
        Width:
        <input type="number" 
        class="some-input" bind:value={width} />
        Height:
        <input type="number" 
        class="some-input" bind:value={height} />
    </div>
</div>

<div class="flex flex-col gap-9 w-full justify-center items-center">
    <table class="mt-10 border-separate border-spacing-2 border border-slate-500" style={"width: " + (width * 50) + "px"}>
        <tbody>
            { #each cells as row, y }
                <tr>
                    { #each row as column, x}
                        <InteractiveCell on:toggle={handleCellToggle} x={x} y={y} value={column} active={column == 1} />
                    { /each }
                </tr>
            { /each }
        </tbody>
    </table>
    <Highlight language={cpp} code={generatedCode} />
    <button on:click={() => {
        navigator.clipboard.writeText(generatedCode).then(() => {
            console.log('Content copied to clipboard');
            const toast = toasts.add({
                title: 'Copied!',
                description: 'Code is now in your clipboard!',
                duration: 10000, // 0 or negative to avoid auto-remove
                placement: 'bottom-right',
                type: 'info',
                theme: 'dark',
                placement: 'bottom-right',
                type: 'success',
                onClick: () => {},
                onRemove: () => {}
                });
        },() => {
            console.error('Failed to copy');
            const toast = toasts.add({
                title: 'Failed to copy!',
                duration: 10000,
                placement: 'bottom-right',
                type: 'error',
                theme: 'dark',
                placement: 'bottom-right',
                type: 'success',
                onClick: () => {},
                });
        });
    }}>Copy code</button>
    <ToastContainer let:data={data}>
		<FlatToast {data}  />
	</ToastContainer>
    <div class="my-20"></div>
</div>