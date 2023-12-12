<script>
    import { createEventDispatcher } from "svelte";

    /** @type {number} */
    export let x;
    /** @type {number} */
    export let y;
    /** @type {number} */
    export let value;
    /** @type {boolean} */
    export let active;

    const dispatch = createEventDispatcher();

    function handleCellClick() {
        dispatch("toggle", {
            x, y 
        });
    }
</script>

<td on:click={handleCellClick} 
    class={`p-1 text-center border
    w-10 h-10
    select-none
    hover:scale-105
    transition
    cursor-pointer
    hover:bg-green-300
    border-slate-600` + 
    (active ? ' bg-red-300' : '')}>
    { value }
</td>