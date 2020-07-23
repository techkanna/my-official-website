// ES6 class

class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = "";
    this.wordIndax = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    const current = this.wordIndax % this.words.length;
    const fullTxt = this.words[current];

    if (this.isDeleting) {
      // remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // add char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // init typespeed
    let typeSpeed = 300;
    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      document.querySelector(".txt").style.border = "none";
      typeSpeed = this.wait;
      this.isDeleting = true;
      document.querySelector(".txt").style.border =
        "border-right: 0.1rem solid #666";
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.wordIndax++;
      typeSpeed = 100;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// init the typeWriter
// add event listener for content loaded
document.addEventListener("DOMContentLoaded", init);

function init() {
  const txtElement = document.querySelector(".type-txt");
  const wait = txtElement.getAttribute("data-wait");
  const words = JSON.parse(txtElement.getAttribute("data-words"));

  // init type writer
  new TypeWriter(txtElement, words, wait);
}
