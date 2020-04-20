import Char from './objGen.json';
export default class GenChar {
    constructor() {
        this.init();
    }
    init() {
        // console.log(Char);
        this.montaHtml(this.montaChar());
        // $(document).on('click','.gp_button', _ => {
        //     this.montaHtml(this.montaChar())
        // });
        // [gp-button]
        document.querySelector('body').addEventListener('click', e => {
            // console.log(e.target.className)
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
                $($arr).each( i => {
                    $arr[i] === "muito alto" && $arr.splice(i,1)
                } )
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
        <h1>Gerador de personagem</h1>
        <ul>
            <li gp-genero>Sexo: ${genero};</li>
            <li gp-idade1>Idade 1: ${idade1};</li>
            <li gp-idade2>Idade 2: ${idade2};</li>
            <li gp-portefisico1>Porte Físico 1: ${body1};</li>
            <li gp-portefisico2>Porte Físico 2: ${body2};</li>
            <li gp-cabelo1>Cabelo: ${cabelo1};</li>
            ${!!cabelo2 && `<li gp-cabelo2>Cabelo: ${cabelo2};</li>`}
            <li gp-humor>Humor: ${humor};</li>
            <li gp-persona>Persona: ${persona};</li>
        </ul>
        <button gp-button class="gp_button">Gerar um novo personagem</button>
        `
        $('[chargen]').html($html);
    }
}
