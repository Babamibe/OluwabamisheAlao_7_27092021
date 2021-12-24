import { search } from "./main.js";

export class AdvanceInput{
    constructor(name, category, bg){
        this.name = name;
        this.category = category;
        this.bg = bg;
        this.inputSpace = document.createElement('input');
        this.inputGroup = document.createElement('div');
        this.iconSpan = document.createElement('span');
        this.iconArrow = document.createElement('i');
        this.hiddenDropdown = document.createElement('div');
        this.itemList = document.createElement('ul');
        this.inputCategory(`${name}s`, `${category}s`, bg);
    }

    //create advance search inputs
    inputCategory(name, category, bg){
        this.inputGroup.classList.add('input-group', 'm-4', category, 'rounded');
        document.getElementById('input').appendChild(this.inputGroup);
        this.inputSpace.classList.add('form-control', bg, 'text-white', `${category}__text-input`);
        this.inputSpace.setAttribute('category', 'text');
        this.inputGroup.appendChild(this.inputSpace);
        this.iconSpan.classList.add('input-group-text', bg, `chevron-${category}`, 'rounded-right');
        this.inputGroup.appendChild(this.iconSpan);
        this.iconArrow.classList.add('fas', 'fa-chevron-down', 'text-white');
        this.iconSpan.appendChild(this.iconArrow);
        this.inputSpace.setAttribute('aria-label', name);
        this.inputSpace.setAttribute('placeholder', name);
        this.iconSpan.addEventListener('click', this.openInput);
        this.dropdownMenu();
        this.inputSpace.addEventListener('input', e => {
            if(e.target.value.length > 0){
                this.filterElements(e);
            }else{
                this.closeDropdown();
            }
        });
    }

    //open advance search input
    openInput = () =>{
        this.inputGroup.classList.add(`${this.category}s-lg`);
        this.inputSpace.classList.remove(`${this.category}s__text-input`);
        this.inputSpace.classList.add(`${this.category}s__text-input-lg`);
        this.inputSpace.setAttribute(`aria-label`, `Recherche un ${this.name.toLowerCase()}`);
        this.inputSpace.setAttribute(`placeholder`, `Recherche un ${this.name.toLowerCase()}`);
        this.iconSpan.classList.remove(`chevron-${this.category}s`);
        this.iconSpan.classList.add(`chevron-${this.category}s-deployed`);
        this.iconArrow.classList.add(`fa-chevron-up`);
        this.iconArrow.classList.remove(`fa-chevron-down`);
        this.openDropdown(this.refreshList(), this.category);
        this.iconSpan.removeEventListener(`click`, this.openInput);
        document.addEventListener(`click`, this.closeInput);
        this.inputGroup.addEventListener("click", e =>{
            e.stopPropagation();
        });
        this.inputSpace.addEventListener(`input`, e =>{
            this.filterElements(e);
        });
        this.iconSpan.addEventListener(`click`, this.closeInput);
    }

    // close advance search input
    closeInput = () => {
        this.inputGroup.classList.remove(`${this.category}s-lg`);
        this.inputSpace.classList.add(`${this.category}s__text-input`);
        this.inputSpace.classList.remove(`${this.category}s__text-input-lg`);
        this.inputSpace.setAttribute(`aria-label`, `${this.name}s`)
        this.inputSpace.setAttribute(`placeholder`, `${this.name}s`);
        this.iconArrow.classList.remove(`fa-chevron-up`);
        this.iconSpan.classList.remove(`chevron-${this.category}s-deployed`);
        this.iconArrow.classList.add(`fa-chevron-down`);
        this.iconSpan.classList.add(`chevron-${this.category}s`);
        this.inputSpace.value = ``;
        this.closeDropdown();
        document.removeEventListener(`click`, this.closeInput);
        this.iconSpan.removeEventListener(`click`, this.closeInput)
        this.iconSpan.addEventListener(`click`, this.openInput);
        this.inputSpace.addEventListener(`input`, e =>{
            if(e.target.value.length > 0){
                this.filterElements(e);
            } else {
                this.closeDropdown();
            }
        });
    }

    // create dropdown div
    dropdownMenu(){
        this.hiddenDropdown.classList.add(this.bg, `${this.category}s__list`, `rounded-bottom`);
        this.hiddenDropdown.style.display = "none";
        this.inputGroup.appendChild(this.hiddenDropdown);
    }

    //create dropdown list
    dropdownList = (element) => {
        this.itemList.innerHTML = ``;
        this.hiddenDropdown.appendChild(this.itemList);
        this.itemList.classList.add(`${this.category}s__ul`, 'list-unstyled');
        element.forEach(item => {
            const li = document.createElement('li');
            li.classList.add(`${this.bg}`, `${this.category}`, 'text-white');
            li.innerHTML = item;
            this.itemList.appendChild(li);
            li.addEventListener("click", e => {
                search.createTag(this.category, item);
                this.dropdownList(this.refreshList());
            })
        })
    }
    // show dropdown list
    openDropdown(element){
        console.log("element", element)
        this.dropdownList(element);
        this.hiddenDropdown.style.display = "flex";
    }

    // filter dropdown list after input
    filterElements(e) {
        let filter = [];
        let list = this.refreshList();
        for(let item of list){
            if(item.includes(e.target.value)){
                filter.push(item);
            }
        }
        this.openDropdown(filter);
    }

    // hide dropdown
    closeDropdown(){
        this.hiddenDropdown.style.display = "none";
    }
}