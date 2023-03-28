let repuesta = 'capuchino'
function cafetera(ingrediente, ingrediente2) {
    if (ingrediente == 'leche' && ingresiente2 == 'cafe') {
        console.log('cafe con leche')
    } else if (ingrediente == 'cafe' && ingrediente2 == 'azucar') {
        console.log('cafe con azucar')
    } else if (ingrediente == 'cafe' && ingrediente2 == 'leche' && ingrediente2 == 'azucar') {
        console.log('cafe con leche y azucar')
    } else if (ingrediente == 'cafe' && ingrediente2 == 'leche' && ingrediente2 == 'azucar') {
        console.log('cafe con leche y azucar')
    }
    return repuesta
}
console.log(cafetera('cafe', 'leche'))
