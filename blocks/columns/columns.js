
export default function decorate(block) {
    if (block.querySelector('h2')) {
        block.querySelector('h2').classList.add('headline');
        block.querySelector('h2').classList.add('headline__main');
        block.querySelector('h2').classList.add('headline--align-center');
        block.querySelector('h2').classList.add('hl-l');
        block.querySelector('h2').classList.add('hl--sub-xs');
    }

    block.querySelectorAll('h3').forEach((h3) =>  {
        h3.classList.add('headline');
        h3.classList.add('headline__main');
        h3.classList.add('hl-xs');
        h3.classList.add('spacing--s');
    });

    block.querySelectorAll('h4').forEach((h4) =>  {
        h4.classList.add('headline__sub');
        h4.classList.add('hl-sub');
    });

    const cols = [...block.firstElementChild.children];
    block.classList.add(`columns-${cols.length}-cols`);

    // setup image columns
    [...block.children].forEach((row) => {
        [...row.children].forEach((col) => {
            const pic = col.querySelector('picture');
            if (pic) {
                const picWrapper = pic.closest('div');
                if (picWrapper && picWrapper.children.length === 1) {
                    // picture is only content in column
                    picWrapper.classList.add('columns-img-col');
                }
            }
        });
    });
}
