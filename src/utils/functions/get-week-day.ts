export function getWeekDay(): string {
    const diasDaSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const dataAtual = new Date();
    const diaDaSemana = dataAtual.getDay();
    return diasDaSemana[diaDaSemana];
}