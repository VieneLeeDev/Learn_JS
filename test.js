// class Cat {
//     cats = []
//     static instance = null

//     static getInstance(){
//         if(Cat.instance === null){
//             Cat.instance = new Cat()
//          }
//          return Cat.instance
//     }

//     getCat(){
//         return this.cats
//     }

//     setCat(data){
//         this.cats.push(data)
//     }
// }

// const cat1 = Cat.getInstance()
// const cat2 = Cat.getInstance()
// const cat3 = Cat.getInstance()
// const cat4 = Cat.getInstance()

// cat1.setCat('hello')
// cat2.setCat('hello')
// cat2.setCat('hello')
// cat2.setCat('hello')

// console.log(cat1.getCat(), cat4.getCat())
function deepClone(obj, hash = new WeakMap()) {
    // Kiểm tra xem obj có phải là giá trị nguyên thủy (primitive value) hay không.
    if (Object(obj) !== obj) return obj; // Primitive value

    // Kiểm tra xem obj có tồn tại trong hash không (để xử lý tham chiếu vòng).
    if (hash.has(obj)) return hash.get(obj); // Circular reference

    // Tạo một bản sao mới của obj. Nếu obj là mảng, tạo một mảng trống.
    // Nếu obj là một đối tượng và có constructor, tạo một đối tượng mới bằng constructor đó.
    // Nếu không có constructor, tạo một đối tượng trống thông qua Object.create(null).
    const result = Array.isArray(obj) ? [] : obj.constructor ? new obj.constructor() : Object.create(null);

    // Lưu obj và bản sao result trong hash để theo dõi các tham chiếu vòng.
    hash.set(obj, result);

    // Nếu obj là Map, deep clone từng cặp key-value và thêm vào result.
    if (obj instanceof Map)
        Array.from(obj, ([key, val]) => result.set(deepClone(key, hash), deepClone(val, hash)));

    // Nếu obj là Set, deep clone từng giá trị và thêm vào result.
    else if (obj instanceof Set)
        Array.from(obj, (key) => result.add(deepClone(key, hash)));

    // Deep clone từng thuộc tính của obj và gán vào result.
    return Object.assign(result, ...Object.keys(obj).map(
        key => ({ [key]: deepClone(obj[key], hash) })));
}

const map = new WeakMap() 

const countVisit = (users) => {
    let count = map.get(users) || 0
    map.set(users, count + 1)
}

let user = {name: "David"}

countVisit(user)
countVisit(user)
countVisit(user)

user = null

console.log(map.has(user))

