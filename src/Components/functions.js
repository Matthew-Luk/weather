export function convertDate(date){
    console.log(date)
    let str = ""
    if(parseInt(date.slice(11,13)) > 12){
        str = parseInt(date.slice(11,13) - 12).toString() + date.slice(13,16) + "PM"
    }else{
        if(date.slice(11,13) === "00"){
            str = "12" + date.slice(13,16) + "AM"
        }else if(date.slice(11,13) === "12"){
            str = "12" + date.slice(13,16) + "PM"
        }else{
            if(parseInt(date.slice(11,13)) == 0){
                str = "12:" + date.slice(13,16) + "AM"
            }else{
                str = date.slice(11,13) + date.slice(13,16) + "AM"
            }
        }
    }
    console.log(str)
    return str
}

function convertTime(x){
    let timeList = []
    let convertedTime = 0
    if(x !== undefined && x !== 0){
        for(let i=0;i<5;i++){
            if(x[i] !== ":"){
                timeList.push(parseInt(x[i]) * 10**(3-timeList.length))
            }
        }
        for(let i=0;i<timeList.length;i++){
            convertedTime = convertedTime + timeList[i]
        }
        if(x.slice(6,8) === "PM"){
            convertedTime = convertedTime + 1200
        }else if(x.slice(6,8) === "AM" && x.slice(0,2) === "12"){
            convertedTime = convertedTime - 1200
        }
    }
    return convertedTime
}

export function getMoon(localTime, sunset, sunrise){
    if(convertTime(localTime) >= convertTime(sunset) || convertTime(localTime) <= convertTime(sunrise)){
        return true
    }else{
        return false
    }
}

export function convertCondition(condition){
    condition = condition.toLowerCase()
    condition = condition.replace(" ", "_")
    return condition
}