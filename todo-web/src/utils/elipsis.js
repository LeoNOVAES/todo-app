const formatterEl = (text, limit) => {
    let textFormated = text;

    if(text) {
        if(text.split('').length > limit) {
            textFormated = `${text.substring(0,limit-3)}...`;
        }    
    }

  
    return textFormated;
}


export default formatterEl;