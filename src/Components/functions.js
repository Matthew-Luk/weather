export function convertDate(date){
    let str = ""
    if(parseInt(date.slice(11,13)) > 12){
        str = parseInt(date.slice(11,13) - 12).toString() + date.slice(13,16) + "PM"
    }else{
        if(date.slice(11,13) == "00"){
            str = "12" + date.slice(13,16) + "AM"
        }else if(date.slice(11,13) == "12"){
            str = "12" + date.slice(13,16) + "PM"
        }else{
            if(parseInt(date.slice(11,13)) < 10){
                str = date.slice(12,13) + date.slice(13,16) + "AM"
            }else{
                str = date.slice(11,13) + date.slice(13,16) + "AM"
            }
        }
    }
    return str
}

export function getSun(x){
    if(x === 1){
        return "backgroundImage: linearGradient(#49c0d4, #fae97f);"
    }else{
        return "backgroundImage: linearGradient(#1417b2, #52095d);"
    }
}