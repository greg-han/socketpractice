//this is just going to be a factory for making objects

class Namespace{
    constructor(id, nsTitle, img, endpoint){
      this.id = id;
      this.img = img;
      this.nsTitle = nsTitle;
      this.endpoint = endpoint;
      this.rooms = [];
    }

   addRoom(roomObj){
      this.rooms.push(roomObj);
  }
}

//anyone who imports this particular file will get this, which is the class
module.exports = Namespace;

