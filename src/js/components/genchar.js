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

    montaChar() {
        
        const $p = {}
        
        const $i = this.roll(Char.idade);
        
        const $iAtual = Math.floor(Math.random() * ($i.max - $i.min) ) + $i.min;

        let $pFisico = _ => {
            let $arr = Char.portefisico1;
            if ($i.nome === 'criança'){
                for (const i in $arr) {
                    $arr[i] === "muito alto" && $arr.splice(i,1)
                }
            }
            return $arr;
        }
        
        const pFisico1 = this.roll($pFisico());

        const $c = this.roll(Char.cabelo1);
        

        $p.genero = this.roll(Char.sexo);
        $p.idade1 = $i.nome;
        $p.idade2 = `${$iAtual} anos`;
        $p.body1 = pFisico1;
        $p.body2 = this.roll(Char.portefisico2);
        $p.cabelo1 = $c;
        $p.cabelo2 = $c !== 'careca' ? this.roll(Char.cabelo2) : null;
        $p.humor = this.roll(Char.humor);
        $p.persona = `O personagem é um ${this.roll(Char.list_a)} ${this.roll(Char.list_b)}`

        return $p;

    }

    montaHtml(obj) {
        const {genero, idade1, idade2, body1, body2, cabelo1, cabelo2, humor, persona} = obj;
        
        const $html = `
        <section>
        <ul>
            <li gp-genero><strong>Sexo:</strong> ${genero};</li>
            <li gp-idade1><strong>Idade 1:</strong> ${idade1};</li>
            <li gp-idade2><strong>Idade 2:</strong> ${idade2};</li>
            <li gp-portefisico1><strong>Porte Físico 1:</strong> ${body1};</li>
            <li gp-portefisico2><strong>Porte Físico 2:</strong> ${body2};</li>
            <li gp-cabelo1><strong>Cabelo:</strong> ${cabelo1};</li>
            ${!!cabelo2 ? `<li gp-cabelo2><strong>Cabelo:</strong> ${cabelo2};</li>` : ''}
            <li gp-humor><strong>Humor:</strong> ${humor};</li>
            <li gp-persona><strong>Persona:</strong> ${persona}</li>
        </ul>
        <button gp-button class="gp_button">Gerar um novo personagem</button>
        </section>
        `;

        const $header = '<header><h1>Gerador de personagem</h1></header>';
        const $footer = '<footer>Desenvolvido por <a href="https://github.com/t4vor4" target="_blank">T4vor4</a></footer>'
        document.querySelector('[chargen]').innerHTML = $header+$html+$footer;
    }
}
