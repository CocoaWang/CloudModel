/**
 * Created by qiushan on 5/31/2016.
 */
var entries = [
    {"id":0001, "name":"MongoDB", "picture":"mongodb.png", "description":"As of July 2015, MongoDB is the fourth most popular type of database management system, and the most popular for document stores"},
    {"id":0002, "name":"Node.js", "picture":"nodejs.png", "description":"Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient"}
];

exports.getImagesEntries = function(){
    return entries;
}

exports.getImagesEntry = function (id){
    for(var i=0; i < entries.length; i++){
        if(entries[i].id == id) return entries[i];
    }
}