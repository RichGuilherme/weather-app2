export const DateCurrent = () => {
    let date = new Date()
    let day = date.getDate()
    let year = date.getFullYear().toString().substr(2, 4)

    
    let mont = date.getMonth()
    let mes = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Aug', 'Set', 'Out', 'Nov', 'Dez']
    let mesDoano = mes[mont]

    let daily = date.getDay()
    let week = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
    let diaDaSemana = week[daily]

    return ` ${diaDaSemana}, ${day} / ${mesDoano}'${year}`
}
