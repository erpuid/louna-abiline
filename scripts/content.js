const observer = new MutationObserver((mutations, obs) => {
  foodHelper(obs)
});

observer.observe(document, {
  childList: true,
  subtree: true
});

function foodHelper(obs) {
  const content = document.getElementsByClassName('ld-ulemiste-body')[0];

  if (content) {
    const menu = content.querySelector('div');

    const tags = []

    let children = menu.children
    if (!children.length) {
      return
    }
    obs.disconnect();

    for (const child of children) {
      tags.push(child.tagName)
    }

    if (tags.includes('svg')) {
      setTimeout(() => {
        foodHelper()
      }, 100)
    } else {
      let removedPrevious = false
      const nodesToRemove = [];
      for (const child of children) {
        if (removedPrevious) {
          nodesToRemove.push(child)
          removedPrevious = false
        } else if (child.tagName === 'ARTICLE') {
          const title = child.getElementsByClassName("section-title")[0]
          if (['dylan ülemiste bistroo', 'gala sushi', 'tlb burger', 'freya foodbar'].includes(title.textContent.toLowerCase())) {
            nodesToRemove.push(child)
            removedPrevious = true
          }
        }
      }

      for (const child of nodesToRemove) {
        menu.removeChild(child)
      }

      const other = document.createElement('article')

      other.insertAdjacentHTML('afterbegin', `
        <div class="row py-2">
            <div class="col-lg-4 col-xl-4">
                <h3>Midagi muud</h3>
            </div>            
            <div class="col-lg-7 ml-lg-auto">
                ${['Räägupesa', 'Burger kitchen', 'Chi', 'Shaurma'].map(p => {
                  return `<div style="margin-bottom: 8px;">${p}</div>`
                }).join('\n')}
            </div>
        </div>
      `)

      menu.appendChild(other)
    }


  }
}
