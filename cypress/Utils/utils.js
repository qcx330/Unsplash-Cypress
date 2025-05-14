class Utils {
    static getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static generateUsername(prefix) {
        const now = new Date();
        const day = now.getDate().toString().padStart(2, '0');
        const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are zero indexed
        const year = now.getFullYear().toString().substr(-2); // Get last two digits of the year
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
    
        return `${prefix}${day}${month}${year}${hours}${minutes}${seconds}`;
    }

    static getRandomNumber(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

export default Utils