import icons from 'url:../../img/icons.svg'; //parcel 2

export default class View {
    _data;
    
/**
 * Render the received object to the DOm
 * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
 * @param {*} {render=true}  ti false, create markup string instead of rendering to the the DOM
 * @returns {undefined | string} A markup string is returned if render=false
 * @this {Object} View instance
 * @author Uwaoma Obinna
 * @todo Finish implementation
 */
    render(data, render = true) {
        if(!data || (Array.isArray(data) && data.length === 0))
         return this._renderError();

        this._data = data;
        const markup = this._generateMarkup();

       if(!render) return markup

        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
    update(data){ 
        this._data = data;
        const newMarkup = this._generateMarkup();
        
        const newDom = document.createRange().createContextualFragment(newMarkup);
        const newElements = Array.from(newDom.querySelectorAll('*'));
        const curElements = Array.from(this._parentElement.querySelectorAll('*'));
        
        newElements.forEach((newE1, i) => {
          const curEl = curElements[i];
          // console.log(curEl, newE1.isEqualNode(curEl));

          //Updates Changed TEXT
          if(!newE1.isEqualNode(curEl) && newE1.firstChild?.nodeValue.trim() !== '') {
            // console.log('Blow', newE1.firstChild.nodeValue.trim());
            curEl.textContent = newE1.textContent;
          }

          //Updates Changed ATTRIBUTES
          if(!newElements.isEqualNode(curEl))
          // console.log(newE1.attributes);
          Array.from(newE1.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value)
          );
        });
    }

    _clear() {
        this._parentElement.innerHTML = '';
    }

     renderSpinner(){
        const markup = `
        <div class="spinner">
                <svg>
                  <use href="${icons}#icon-loader"></use>
                </svg>
        </div>
        `;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
      };

      renderError(message = this._errorMessage) {
        const markup = `
        <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
        `
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
      }

      renderMessage(message = this._message) {
        const markup = `
        <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
        `
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
      }
}