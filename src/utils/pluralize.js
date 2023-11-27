function getPluralForm(wordSingular, wordPlural, count) {
    if (count >= 2 && count <= 4) {
        return `${count} ${wordPlural}`;
    } else {
        return `${count} ${wordSingular}`;
    }
}

export default getPluralForm;