document.addEventListener("DOMContentLoaded", function () {
    const submitBtn = document.getElementById("bookSubmit");
    

    submitBtn.addEventListener("click", function(event){
        event.preventDefault();
        addBook();
    });

    const searchBtn = document.getElementById("searchSubmit");
    searchBtn.addEventListener("click", function(event){
        event.preventDefault();
        searchBooks();
    });

    if(isStorageExist()){
        loadDataFromStorage();
    } 
});

const selesaiText = document.getElementById("baca");
const selesai = document.getElementById("inputBookIsComplete");
selesai.addEventListener("click", function(){
    if(selesai.checked == true){
        selesaiText.innerText = "Selesai Dibaca";
    }else{
        selesaiText.innerText = "Belum selesai dibaca";
    }
});

document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil disimpan.");
});

document.addEventListener("ondataloaded", () => {
    refreshDataFromBooks();
});