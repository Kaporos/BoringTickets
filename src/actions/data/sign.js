String.prototype.hashCode = function() {
    var hash = 0;
    for (var i = 0; i < this.length; i++) {
        var char = this.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}


export function sign(data, code) {
    console.log(data)
    console.log(code)
    return (JSON.stringify(data) + code).hashCode();
}