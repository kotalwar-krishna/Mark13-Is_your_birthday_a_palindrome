var dateInput = document.querySelector("#birthday-input");
var cheackBtn = document.querySelector("#cheack");
var outputMSg = document.querySelector(".output");




function reverseStr(str){
    var listOfChars =str.split('');
    var reverseListOfChars = listOfChars.reverse();
    var reversedStr = reverseListOfChars.join('');
    return reversedStr;
}

function isPalidrome(str){
    var reverse = reverseStr(str);
    return str === reverse;
}

function convertDateToStr(date){
    var dateStr = { day: '', month: '', year: ''};

    if(date.day < 10){
        dateStr.day = '0' + date.day;
    }
    else{
        dateStr.day = date.day.toString();
    }

    if(date.month < 10){
        dateStr.month = '0' + date.month;
    }
    else{
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();

    return dateStr;
}

function getAllDateFormat(date){
    var dateStr =convertDateToStr(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd]
}

function cheackPalidrmeForAllDateFormats(date){
    var listOfFormats = getAllDateFormat(date);

    var isAnyFormatPalidrome = false;

    for(var i = 0 ; i < listOfFormats.length; i++){
        if(isPalidrome(listOfFormats[i])){
            isAnyFormatPalidrome = true;
            break;
        }
    }

    return isAnyFormatPalidrome;
}


function leapYear(year){
    if(year % 400 === 0){
        return true;
    }
    if(year % 100 === 0){
        return false;
    }
    if(year % 4 === 0){
        return true;
    }

    return false;
}

function getNextDate(date){
    var day = date.day +1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if(month === 2){
        if(leapYear(year)){
            if(day > 29){
                day = 1;
                month = month + 1;
            }
        }else{
            if(day > 28){
                day = 1;
                month = month + 1;
            }
        }
    }else{
        if(day > daysInMonth[month - 1]){
            day = 1;
            month = month + 1;
        }
    }
    if( month > 12){
        month = 1;
        year = year +1;
    }

    return {
        day: day,
        month: month,
        year: year
    }


}



function getNextPalidromeDate(date){
    var count = 0;
    var nextDate = getNextDate(date);

    while(1){
        count++;
        var isPalidromeDateFound = cheackPalidrmeForAllDateFormats(nextDate);

        if(isPalidromeDateFound){
            break;
        }
        nextDate = getNextDate(nextDate);

        }

    return [count, nextDate];

}


function clickHandler(){
    var bdayStr = dateInput.value;

    if(bdayStr !== ''){
        var dateInList = bdayStr.split('-');
        var date = {
            day: Number(dateInList[2]),
            month: Number(dateInList[1]),
            year:  Number(dateInList[0])
        }
    }

    var isGivenDatePalidrome = cheackPalidrmeForAllDateFormats(date);
    // console.log(isGivenDatePalidrome);

    if(isGivenDatePalidrome){
        outputMSg.innerText = "Your BirthDate Is Palidrome."
    }else{
        var listP = getNextPalidromeDate(date);
        console.log(listP);
        outputMSg.innerText = "The next palidrome date(yyyy-mm-dd) is: " + listP[1].year+"-"+listP[1].month+"-"+listP[1].day +" after " + listP[0] +" days."
    }
}

cheackBtn.addEventListener("click", clickHandler);

// var date = {
//     day: 31,
//     month: 12,
//     year: 2020
// };

// console.log(getNextPalidromeDate(date))