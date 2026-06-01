let allExtensions = [];

const btnAll = document.getElementById('btn-all');
const btnActive = document.getElementById('btn-active');
const btnInactive = document.getElementById('btn-inactive');





/* Get Extensions Data */
async function loadExtensionsData() {
  try {
    const response = await fetch('https://gist.githubusercontent.com/MostafaAbobaker/27d8727973e8b95202b4cb454d81ed47/raw/9016c69365e7afea192c7db933007c29a3fd7f03/data.json');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    allExtensions = await response.json();

    renderData(allExtensions);
    btnAll.classList.add('active'); 

  } catch (error) {
    console.error('Failed to load JSON data:', error);
  }
}


/* Draw Data From Html */
function renderData(extensionsArray) {
  const container = document.getElementById('extensionsList');
  if (extensionsArray.length === 0) {
    container.innerHTML = '<p>No extensions found matching this filter.</p>';
    return;
  }
  const htmlContent = extensionsArray.map(extension => `
            <article class="card">
            <div class="card-body">
              <picture>
                <source srcset="${extension.logo}" media="(orientation: portrait)" />
                <img src="${extension.logo}" alt="${extension.name} logo" />
              </picture>
              <div class="card-content">
                <h3 class="card-title">${extension.name}</h3>
                <p class="card-description">
                  ${extension.description}
                </p>
              </div>
            </div>
            <div class="card-footer">
              <button class="card-remove" onclick="deleteExtension('${extension.name}')">Remove</button>
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="${extension.name}" ${extension.isActive ? 'checked' : ''} onchange="toggleExtensionStatus('${extension.name}')"/>
                <label class="form-check-label" for="${extension.name}"></label>
              </div>
            </div>
          </article>
        `).join('');
  container.innerHTML = htmlContent;
}

/* Toggle Extension Status */
window.toggleExtensionStatus = function (extensionName) {
  const extension = allExtensions.find(e => e.name === extensionName);
  if (extension) {
    extension.isActive = !extension.isActive;
    applyFilterAndRender();
  }
};

/* Apply Filter and Render Data */

function applyFilterAndRender() {
    let filteredExtensions = allExtensions;
    if (currentFilter === 'active') {
        filteredExtensions = allExtensions.filter(extension => extension.isActive === true);
    } else if (currentFilter === 'inactive') {
        filteredExtensions = allExtensions.filter(extension => extension.isActive === false);
    }
    renderData(filteredExtensions);
}
  

  // Show All: Pass the original unfiltered array
  btnAll.addEventListener('click', () => {
    renderData(allExtensions);
    btnInactive.classList.remove('active');
    btnActive.classList.remove('active');
    btnAll.classList.add('active');
  });

  // Show Active: Filter for active === true
  btnActive.addEventListener('click', () => {
    const activeExtensions = allExtensions.filter(extension => extension.isActive === true);
    renderData(activeExtensions);
    btnAll.classList.remove('active');
    btnInactive.classList.remove('active');
    btnActive.classList.add('active');
  });

  // Show Inactive: Filter for active === false
  btnInactive.addEventListener('click', () => {
    const inactiveExtensions = allExtensions.filter(extension => extension.isActive === false);
    renderData(inactiveExtensions);
    btnAll.classList.remove('active');
    btnActive.classList.remove('active');
    btnInactive.classList.add('active');
  });



/* Delete Extension */
window.deleteExtension = function(extensionName) {
    if (confirm("Are you sure you want to delete this extension?")) {
        
        allExtensions = allExtensions.filter(extension => extension.name !== extensionName);
        
        renderData(allExtensions);
        console.log(`Extension ${extensionName} deleted locally.`);
    }
};



document.addEventListener('DOMContentLoaded', loadExtensionsData);

