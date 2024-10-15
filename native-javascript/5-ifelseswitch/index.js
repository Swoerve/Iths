//let p = prompt();
//
//if (p >= 18) {
//    alert("Vuxen");
//} else {
//    alert("Ungdom");
//}

//let username = prompt("Username: ");
//let pass = prompt("Password: ");
//
//if (username === "alice" && pass === "secret") {
//    alert("Inloggad!");
//} else {
//    alert("Fel användarnamn eller lösenord!");
//}

//let number = prompt("Number: ");
//
//switch (number) {
//    case "1":
//        alert("ett");
//        break;
//    case "2":
//        alert("två");
//        break;
//    case "3":
//        alert("tre");
//        break;
//    case "4":
//        alert("fyra");
//        break;
//    case "5":
//        alert("fem");
//        break;
//    case "6":
//        alert("sex");
//        break;
//    case "7":
//        alert("sju");
//        break;
//    case "8":
//        alert("åtta");
//        break;
//    case "9":
//        alert("nio");
//        break;
//    case "10":
//        alert("tio");
//        break;
//    case "11":
//        alert("elva");
//        break;
//    case "12":
//        alert("tolv");
//        break;
//    default:
//        alert(number);
//}

let num = prompt();
if (num) {
    if (!isNaN(num)) {
        alert(num * 0.8);
    } else {
        alert("Du skrev inte in ett nummer.");
    }
}
