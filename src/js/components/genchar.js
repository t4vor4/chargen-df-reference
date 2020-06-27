import Char from './objGen.json';
export default class GenChar {
    constructor() {
        this.init();
    }
    init() {
        this.montaHtml(this.montaChar());
        document.querySelector('body').addEventListener('click', e => {
            e.target.className === 'gp_button' && this.montaHtml(this.montaChar());
        })
    }

    roll(obj) {
        var resultado = Math.floor( Math.random() * obj.length );
        return obj[resultado];
    }

    genero() {
        return this.roll(Char.sexo);
    }

    idade() {
        const idade = this.roll(Char.idade);
        return `entre ${idade.min} e ${idade.max} anos`
    }

    fisico() {
        const $roll = this.roll;
        const body = {
            a: $roll(Char.portefisico1),
            b: $roll(Char.portefisico2)
        }
        return body;
    }

    cabelo() {
        const type1 = this.roll(Char.cabelo1);
        const type2 = type1 === 'careca' ? 'não tem' : this.roll(Char.cabelo2);
        return {a: type1, b: type2}
    }

    humor() {
        return this.roll(Char.humor);
    }

    personaA() {
        return  this.roll(Char.list_a);
    }

    personaB() {
        return  this.roll(Char.list_b);
    }

    montaChar() {

        const $p = {}

        $p.genero = this.genero();
        $p.idade = this.idade();
        $p.body = this.fisico();
        $p.cabelo = this.cabelo();
        $p.humor = this.humor();
        $p.personaA = this.personaA();
        $p.personaB = this.personaB();
        $p.validador = $p.genero === 'masculino'? 'a' : 'b';
        $p.personaC = `O personagem é ${$p.personaA[$p.validador]} ${$p.personaB}`

        return $p;

    }

    montaHtml(obj) {
        const $html = `
        <section>
        <ul>
            <li gp-genero><strong>Sexo:</strong> ${obj.genero};</li>
            <li gp-idade1><strong>Idade:</strong> ${obj.idade};</li>
            <li gp-portefisico1><strong>Porte Físico 1:</strong> ${obj.body.a};</li>
            <li gp-portefisico2><strong>Porte Físico 2:</strong> ${obj.body.b};</li>
            <li gp-cabelo1><strong>Cabelo (tamanho):</strong> ${obj.cabelo.a};</li>
            <li gp-cabelo2><strong>Cabelo (tipo):</strong> ${obj.cabelo.b};</li>
            <li gp-humor><strong>Humor:</strong> ${obj.humor};</li>
            <li gp-persona><strong>Persona:</strong> ${obj.personaC}</li>
            
        </ul>
        <button gp-button class="gp_button">Gerar um novo personagem</button>
        </section>
        `;

        const $header = '<header><h1>Gerador de personagem</h1></header>';
        const $footer = '<footer>Desenvolvido por <a href="https://github.com/t4vor4" target="_blank">T4vor4</a></footer>'
        document.querySelector('[chargen]').innerHTML = $header+$html+$footer;
    }
}
