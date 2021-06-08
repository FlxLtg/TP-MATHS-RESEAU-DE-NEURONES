var e0 = 1; 
var y = null; //sert d'index
var tMax = 2500; //nombre d'itérations max choisi à l'avance
var pas = 0.15; //choisi "au hasard"
var numIteration = 0; //initialisation du compteur d'itérations
var donnees = [
  [-4, 4, 0],
  [-2, 4, 0],
  [0, 4, 0],
  [2, 4, 0],
  [4, 4, 0],
  [-4, -4, 0],
  [-2, -4, 0],
  [0, -4, 0],
  [2, -4, 0],
  [4, -4, 0],
  [-4, -2, 0],
  [-4, 0, 0],
  [-4, 2, 0],
  [4, -2, 0],
  [4, 0, 0],
  [4, 2, 0],
  [-0.2, 0.4, 1],
  [0.2, 0.4, 1],
  [-0.2, -0.4, 1],
  [0.2, -0.4, 1],
  [-0.3, 0.2, 1],
  [0, 0.2, 1],
  [0.3, 0.2, 1],
  [-0.3, -0.2, 1],
  [0, -0.2, 1],
  [0.3, -0.2, 1],
  [-0.4, 0, 1],
  [-0.2, 0, 1],
  [0.2, 0, 1],
  [0.4, 0, 1]
];

var nA = null; 
var nB = null; 
var nZ = null;

var poidsE0NZ = 0; 
var poidsNANZ = randomInteger(1,10)/10; //poids aleatoire entre 0.1 et 1
var poidsNBNZ = randomInteger(1,10)/10; //poids aleatoire entre 0.1 et 1

var poidsE0NA = 0; 
var poidsE1NA = randomInteger(1,10)/10; //poids aleatoire entre 0.1 et 1
var poidsE2NA = randomInteger(1,10)/10; //poids aleatoire entre 0.1 et 1

var poidsE0NB = 0;
var poidsE1NB = randomInteger(1,10)/10; //poids aleatoire entre 0.1 et 1
var poidsE2NB = randomInteger(1,10)/10; //poids aleatoire entre 0.1 et 1

var deltaA = null;
var deltaB = null;
var deltaZ = null;

var newPoidsE0NA = null;
var newPoidsE1NA = null;
var newPoidsE2NA = null;

var newPoidsE0NB = null;
var newPoidsE1NB = null;
var newPoidsE2NB = null;

var newPoidsE0NZ = null;
var newPoidsNANZ = null;
var newPoidsNBNZ = null;

//genere des nbrs aleatoires entre min inclus et max inclus
function randomInteger(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//calculer la logistique d'un nombre x donné
function logistic(x){
  return 1/(1+Math.pow(Math.E, -x));
}

//calcule la valeur d'activation du neurone A
function calculnA(y){
  nA = logistic(poidsE0NA*e0 + poidsE1NA*donnees[y][0] + poidsE2NA*donnees[y][1]);
}

//calcule la valeur d'activation du neurone B
function calculnB(y){
  nB = logistic(poidsE0NB*e0 + poidsE1NB*donnees[y][0] + poidsE2NB*donnees[y][1]);
}

//calcule la valeur d'activation du neurone Z
function calculnZ(){
  nZ = logistic(poidsE0NZ*e0 + poidsNANZ*nA + poidsNBNZ*nB);
}

// calcule le delta du neurone Z
function calculDeltaZ(y){
  // deltaZ = (donnees[y][2]-nZ * nZ*(1-nZ));
  deltaZ = donnees[y][2]-nZ;
}

// calcule le delta du neurone A
function calculDeltaA(){
  deltaA = (nA*(1-nA) * poidsNANZ * deltaZ); 
}

// calcule le delta du neurone B
function calculDeltaB(){
  deltaB = (nB*(1-nB) * poidsNBNZ * deltaZ);
}

//mets à jour les poids en fonction des delta (updatePoidsE0NA se traduit par le poids entre l'entree e0 et le neurone A)
function updatePoidsE0NA(){
  newPoidsE0NA = (poidsE0NA+pas * deltaA * e0);
}
function updatePoidsE1NA(y){
  newPoidsE1NA = (poidsE1NA+pas * deltaA * donnees[y][0]);
}
function updatePoidsE2NA(y){
  newPoidsE2NA = (poidsE2NA+pas * deltaA * donnees[y][1]);
}

function updatePoidsE0NB(){
  newPoidsE0NB = (poidsE0NB+pas * deltaB * e0);
}
function updatePoidsE1NB(y){
  newPoidsE1NB = (poidsE1NB+pas * deltaB * donnees[y][0]);
}
function updatePoidsE2NB(y){
  newPoidsE2NB = (poidsE2NB+pas * deltaB * donnees[y][1]);
}

function updatePoidsE0NZ(){
  newPoidsE0NZ = (poidsE0NZ+pas * deltaZ * e0);
}
function updatePoidsNANZ(){
  newPoidsNANZ = (poidsNANZ+pas * deltaZ * nA);
}
function updatePoidsNBNZ(){
  newPoidsNBNZ = (poidsNBNZ+pas * deltaZ * nB);
}

//mets à jour les poids pour que la prochaine iteration s'effectue avec les nouveaux poids
function updateReseauNeurone(){
  poidsE0NA = newPoidsE0NA;
  poidsE1NA = newPoidsE1NA;
  poidsE2NA = newPoidsE2NA;

  poidsE0NB = newPoidsE0NB;
  poidsE1NB = newPoidsE1NB;
  poidsE2NB = newPoidsE2NB;

  poidsE0NZ = newPoidsE0NZ;
  poidsNANZ = newPoidsNANZ;
  poidsNBNZ = newPoidsNBNZ;
}

//on affiche dans la page html les poids initiaux
var tag1 = document.createElement("p");
var text1 = document.createTextNode("Les poids initiaux sont : \n\n de e0 vers A :"+poidsE0NA.toFixed(3)+"\nde e0 vers B :"+poidsE0NB.toFixed(3)+"\nde e0 vers Z :"+poidsE0NZ.toFixed(3)+"\n\nde e1 vers A :"+poidsE1NA.toFixed(3)+"\nde e1 vers B :"+poidsE1NB.toFixed(3)+"\n\nde e2 vers A :"+poidsE2NA.toFixed(3)+"\nde e2 vers B :"+poidsE2NB.toFixed(3)+"\n\nde A vers Z :"+poidsNANZ.toFixed(3)+"\n\nde B vers Z :"+poidsNBNZ.toFixed(3));
tag1.appendChild(text1);
var element1 = document.getElementById("poidsInitiaux");
element1.appendChild(tag1);

//effectue toutes les operations de l'alogrithme détaillées plus haut tMax fois.
while(numIteration <= tMax){

  y = randomInteger(0,donnees.length-1);

  calculnA(y);
  console.log("le neurone A activé vaut : " + nA + " à l'itération " +numIteration);
  calculnB(y);
  console.log("le neurone B activé vaut : " + nB + " à l'itération " +numIteration);
  calculnZ();
  console.log("le neurone Z activé vaut : " + nZ + " à l'itération " +numIteration + "\n\nLa sortie vaut donc " + nZ + " a l'itération " + numIteration +"\n\n");

  calculDeltaZ(y);
  console.log("le delta du neurone Z vaut : " + deltaZ + " à l'itération " +numIteration)
  calculDeltaA();
  console.log("le delta du neurone A vaut : " + deltaA + " à l'itération " +numIteration);
  calculDeltaB();
  console.log("le delta du neurone B vaut : " + deltaB + " à l'itération " +numIteration +"\n\n");

  updatePoidsE0NA();
  console.log("le nouveau poids de la liaison entre e0 et le neurone A est : " +newPoidsE0NA);
  updatePoidsE1NA(y);
  console.log("le nouveau poids de la liaison entre e1 et le neurone A est : " +newPoidsE1NA);
  updatePoidsE2NA(y);
  console.log("le nouveau poids de la liaison entre e2 et le neurone A est : " +newPoidsE2NA +"\n\n");

  updatePoidsE0NB();
  console.log("le nouveau poids de la liaison entre e0 et le neurone B est : " +newPoidsE0NB);
  updatePoidsE1NB(y);
  console.log("le nouveau poids de la liaison entre e1 et le neurone B est : " +newPoidsE1NB);
  updatePoidsE2NB(y);
  console.log("le nouveau poids de la liaison entre e2 et le neurone B est : " +newPoidsE2NB +"\n\n");

  updatePoidsE0NZ();
  console.log("le nouveau poids de la liaison entre e0 et le neurone Z est : " +newPoidsE0NZ);
  updatePoidsNANZ();
  console.log("le nouveau poids de la liaison entre le neurone A et le neurone Z est : " +newPoidsNANZ);
  updatePoidsNBNZ();
  console.log("le nouveau poids de la liaison entre le neurone B et le neurone Z est : " +newPoidsNBNZ +"\n\n");

  updateReseauNeurone();
  numIteration++;
}

//une fois les itérations fini et l'alogrithme suffisament entrainé, on annonce dans la console que l'on fixe les poids. (poids finaux).
console.log("Les poids sont desormais fixés, calculons la sortie Z pour chaque echantillon du tableau de donnees fournies\n\n");

//on affiche dans la page html les poids finaux qui vont servir a calculé la sortie de chaque couple d'entrées du tableau "données"
var tag1 = document.createElement("p");
var text1 = document.createTextNode("Les poids finaux sont : \n\n de e0 vers A :"+poidsE0NA.toFixed(3)+"\nde e0 vers B :"+poidsE0NB.toFixed(3)+"\nde e0 vers Z :"+poidsE0NZ.toFixed(3)+"\n\nde e1 vers A :"+poidsE1NA.toFixed(3)+"\nde e1 vers B :"+poidsE1NB.toFixed(3)+"\n\nde e2 vers A :"+poidsE2NA.toFixed(3)+"\nde e2 vers B :"+poidsE2NB.toFixed(3)+"\n\nde A vers Z :"+poidsNANZ.toFixed(3)+"\n\nde B vers Z :"+poidsNBNZ.toFixed(3));
tag1.appendChild(text1);
var element1 = document.getElementById("poidsFinaux");
element1.appendChild(tag1);

var xSup05 = [];
var ySup05 = [];
var xInf05 = [];
var yInf05 = [];

//calcule pour un tableau fourni la valeur d'activation de chaque neurone et donc sa sortie Z en fonctions des entrées presentes dans ce tableau, avec des poids fixes (les poids finaux). Affiche les reponse dans la console ainsi que dans la page html.
function calculSortieFinal(donnee, index){
  calculnA(index);
  console.log("Pour le couple d'entrées e1:" + donnee[0] + ", e2:" + donnee[1] + " et e0:1");
  console.log("le neurone A activé vaut : " + nA);
  calculnB(index);
  console.log("le neurone B activé vaut : " + nB);
  calculnZ();
  console.log("le neurone Z activé vaut : " + nZ + "\n\nLa sortie vaut donc " + nZ + " et la reponse attendue est : " + donnee[2] +"\n\n");

  var tag = document.createElement("p");
  var text = document.createTextNode("Pour le couple d'entrées e1:" + donnee[0] + ", e2:" + donnee[1] + " et e0:1, la sortie vaut " + nZ + " et la reponse attendue est " + donnee[2]);
  tag.appendChild(text);
  var element = document.getElementById("result");
  element.appendChild(tag);

  if(donnee[2] == 0 && nZ < 0.1){
    var tag2 = document.createElement("p");
    var text2 = document.createTextNode("Le point est très bien placé");
    tag2.appendChild(text2);
    var element2 = document.getElementById("result");
    element2.appendChild(tag2);
  }
  if(donnee[2] == 0 && nZ > 0.1 && nZ < 0.3){
    var tag2 = document.createElement("p");
    var text2 = document.createTextNode("Le point n'est 'pas très bien' placé");
    tag2.appendChild(text2);
    var element2 = document.getElementById("result");
    element2.appendChild(tag2);
  }
  if(donnee[2] == 0 && nZ > 0.3){
    var tag2 = document.createElement("p");
    var text2 = document.createTextNode("Le point est très mal placé");
    tag2.appendChild(text2);
    var element2 = document.getElementById("result");
    element2.appendChild(tag2);
  }

  if(donnee[2] == 1 && nZ > 0.9){
    var tag2 = document.createElement("p");
    var text2 = document.createTextNode("Le point est très bien placé");
    tag2.appendChild(text2);
    var element2 = document.getElementById("result");
    element2.appendChild(tag2);
  }
  if(donnee[2] == 1 && nZ < 0.9 && nZ > 0.7){
    var tag2 = document.createElement("p");
    var text2 = document.createTextNode("Le point n'est 'pas très bien' placé");
    tag2.appendChild(text2);
    var element2 = document.getElementById("result");
    element2.appendChild(tag2);
  }
  if(donnee[2] == 1 && nZ < 0.7){
    var tag2 = document.createElement("p");
    var text2 = document.createTextNode("Le point est très mal placé");
    tag2.appendChild(text2);
    var element2 = document.getElementById("result");
    element2.appendChild(tag2);
  }
  

  //selon les reponses obtenus, on ajoute les valeurs dans differents tableau pour pouvoir ensuite créer un graph en fonctions des reponeses obtenues (superieur ou inferieur à 0.5)
  if(nZ > 0.5){
    xSup05.push(donnee[0])
    ySup05.push(donnee[1])
  }
  else{
    xInf05.push(donnee[0])
    yInf05.push(donnee[1])
  }
}

//effectue la methode vu ci dessus pour chaque tableau d'entrées du tableau "donnees"
donnees.forEach(calculSortieFinal);

//une fois l'algo fini, affichage d'un graph en fonction des reponses obtenu (reponse > à 0.5 ou < à 0.5)

var trace1 = {
  x: xSup05,
  y: ySup05,
  mode: 'markers',
  type: 'scatter',
  name: 'Reponses > 0.5'
};

var trace2 = {
  x: xInf05,
  y: yInf05,
  mode: 'markers',
  type: 'scatter',
  name: 'Reponses < 0.5'
};

var data = [trace1, trace2];

Plotly.newPlot('chart', data);