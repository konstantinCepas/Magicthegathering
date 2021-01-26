export function UserReg() {

    this.registerUser = function(user) {
         let newUser = JSON.stringify(user);
         localStorage.setItem(user.username, newUser);
         return true; 
    }

    this.getUser = function(username) {
        let user = JSON.parse(localStorage.getItem(username));
        return user;
    }
}