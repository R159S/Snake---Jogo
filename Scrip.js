window.onload = function(){
    var stage = document.getElementById('stage')
    var ctx = stage.getContext("2d")
    document.addEventListener("keydown", keyPush)

    setInterval(game, 100) //intervalo em milisegundos que a função jogo é chamada
    
    const velocidade = 1 //velocidade que a cobra andará pela arena

    var vely = 1 //velocidade y = 1
    var velx = 0 //velocidade x = 0
    var partx = party = 5 //será o ponto de partida x e y
    var pixel = 25 //tamanho do pixel (ponto)
    var qp = 25 //quantidade de peças na arena
    var Applex = Appley = 15 //Localização inicial da fruta
    
    var trail = [] //rastro da cobra
    var tail = 3 //tamanho da cobra
    var score = 0   

    function game(){
        //abaixo, as coordenadas plotam a cobra em X e Y
        partx += velx 
        party += vely

        if (partx < 0) {
            partx = qp - 1 //caso a cobra passa do ponto 0, ela reaparece do outro lado em X
        }

        if (partx > qp - 1){
            partx = 0 //caso a cobra passe do ponto de destino, reparece no ponto 0 em X
        }

        if (party < 0) {
            party = qp - 1 //caso a cobra passa do ponto 0, ela reaparece do outro lado em Y
        }

        if (party > qp - 1){
            party = 0 //caso a cobra passe do ponto de destino, reparece no ponto 0 em Y
        }

        ctx.fillStyle = "black" //Preeche a arena do jogo com a cor preta 
        ctx.fillRect(0,0, stage.width, stage.height) //pinta a arena
        
        ctx.fillStyle = "red" //preenche a fruta com a vermelha
        ctx.fillRect(Applex * pixel, Appley * pixel, pixel, pixel) //pinta a fruta

        ctx.fillStyle = "gray" //preenche a cobra com a cor cinza
        for (var i = 0; i < trail.length; i++){
            ctx.fillRect(trail[i].x * pixel, trail[i].y * pixel, pixel - 1, pixel - 1) //pinta a cobra
            
            if(trail[i].x == partx && trail[i].y == party){
                velx = vely = 0; //se a cobra "se morder", ela para de andar, game over
                tail = 1
                setInterval(fimDeJogo, 500)
                

                function fimDeJogo(){
                    document.write('<div><h1>Fim de jogo!!!</h1></div>')
                    document.write('Sua Pontuação: ', score,'<br>')
                    document.write('Atualize a página para tentar de novo!!!')
                    stop(fimDeJogo)
                }
                
                
            }
        }
        
        trail.push({x:partx, y:party})//cria um objeto JSON
        while(trail.length > tail) {
            trail.shift();//se a cauda estiver maior que o rastro, se tira um ponto da array de trail
        }

        if (Applex == partx && Appley == party){ //se a cobra comer a fruta, ela cresce um ponto e a fruta muda para uma posição aleatória
            tail++
            score = score + 10
            Applex = Math.floor(Math.random()*qp)
            Appley = Math.floor(Math.random()*qp)

        }

    }

    function keyPush(event){
        switch(event.keyCode){
            case 37: // seta esquerda
                velx =- velocidade
                vely = 0
                break
            case 38: // seta cima
                velx = 0
                vely =- velocidade
                break
            case 39: // seta direita
                velx = velocidade
                vely = 0
                break
            case 40: // seta baixo
                velx = 0
                vely = velocidade  
                break
            default:
                
                break
        }
    }

}
