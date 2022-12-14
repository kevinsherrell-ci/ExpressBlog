const express = require('express');
const router = express.Router();

const blogValidator = require('../validation/blog');

const sampleBlogs = [
    {
        title: "dicta",
        text: "Iusto et in et. Nulla accusantium fugit. Et qui dolorem inventore soluta et veritatis. Aut ut aut non laudantium eveniet suscipit odit. Sapiente sint nihil nihil sit et molestias. In nisi omnis quas et sed aut minus aperiam ea.\n \rLaudantium quo quisquam quae. Et et quas officia perspiciatis iusto sunt sunt eaque. Quidem sit voluptas deserunt sequi magni.\n \rEst est facere cumque ipsam omnis animi. Voluptatem magnam officiis architecto possimus. Quia similique aut eos qui. Quasi quae sed aliquam.",
        author: "Darren Abbott",
        category: ["Lorem", "sit", "amet"],
        createdAt: "2022-03-22T10:36:37.176Z",
        lastModified: "2022-03-22T10:36:37.176Z",
    },
    {
        title: "ducimus",
        text: "Placeat ea et fuga. Qui itaque quibusdam nam. Maxime nobis quam. Et laudantium sunt incidunt reiciendis.\n \rEarum aut sed omnis autem aliquam architecto corporis sint. Nostrum cumque voluptatem aperiam alias similique. Tenetur et esse omnis praesentium ipsum alias. Impedit rerum qui quia quaerat architecto mollitia est autem. Qui blanditiis earum et qui dolorum reprehenderit. Debitis est temporibus.\n \rEt nam sed. Corporis ut rerum. Ut qui dolore est dolorem ex.",
        author: "Luke Rogahn PhD",
        category: ["Lorem", "ipsum"],
        createdAt: "2022-03-22T15:16:56.285Z",
        lastModified: "2022-03-22T15:16:56.285Z",
    },
    {
        title: "quod",
        text: "Accusamus nisi eos. Tenetur earum tenetur nemo. Qui voluptas temporibus repellendus maxime. Ipsum optio voluptate enim nihil. Ea et dolorem. Omnis unde perspiciatis.\n \rUt odio eaque. Harum non placeat. Eveniet molestiae in cupiditate dolor doloremque rerum eligendi aut ab.\n \rMolestias eligendi et. Nemo velit natus autem numquam atque provident et nulla. In et dolores ad nihil. Delectus quis doloremque asperiores similique. Asperiores id nam vitae nobis labore autem. Dolor aperiam provident quia consectetur aut ut.",
        author: "Maryann Schneider",
        category: ["Lorem", "ipsum", "dolor", "sit", "amet"],
        createdAt: "2022-03-21T20:09:32.298Z",
        lastModified: "2022-03-21T20:09:32.298Z",
    },
    {
        title: "ut",
        text: "Itaque necessitatibus repudiandae. Porro suscipit exercitationem qui atque. Perferendis suscipit debitis sint aut dignissimos nobis ut. Modi ea nihil est vel consequuntur voluptatem. In magnam delectus in eos reiciendis sit est enim eligendi. Sint dicta at.\n \rConsectetur aspernatur alias sed non explicabo blanditiis laborum fugit voluptate. Reiciendis iste aut sit natus qui et in ratione. Placeat qui in voluptatum autem nulla ratione. Commodi sit alias sint sapiente rem. Quia sapiente minus deleniti vitae.\n \rExercitationem numquam omnis maxime dolorum sed deserunt suscipit laudantium. Ad et autem voluptatem esse laudantium et. Id fuga accusamus est sapiente dicta.",
        author: "Dr. Lorenzo Anderson",
        category: ["ipsum", "dolor", "sit", "amet"],
        createdAt: "2022-03-21T23:07:53.447Z",
        lastModified: "2022-03-21T23:07:53.447Z",
    },
    {
        title: "id",
        text: "Porro officia aliquid fugiat sed reprehenderit illo amet doloribus sed. Molestiae vero et. Quae voluptates dolores. Voluptatem facere fuga. Veniam perferendis illo ut sunt earum deleniti.\n \rIusto neque dolorem esse error. Saepe et quia ut corrupti. Autem repellendus similique dolorem sunt in ipsa perferendis. Et excepturi ut voluptatem deserunt accusantium dolores aperiam cum ut.\n \rDoloremque expedita sit et voluptatem unde libero. Numquam beatae sed repellat iusto doloribus fugit tenetur. Possimus et ut adipisci harum voluptatem provident consequatur. Corporis quo aut vel itaque blanditiis illum.",
        author: "Bobbie Dach",
        category: ["amet"],
        createdAt: "2022-03-22T15:14:39.819Z",
        lastModified: "2022-03-22T15:14:39.819Z",
    },
];

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/all', function(req, res, next){
    res.json({
        success: true,
        blogs: sampleBlogs
    })
})

router.get("/single/:titleToGet", function(req, res, next){
    let titleToGet;
    if(req.params.titleToGet){
        titleToGet = req.params.titleToGet;
    }else{
        throw "must enter a title";
    }

    try{
        const found = sampleBlogs.find(blog=>titleToGet === blog.title);
        if(found !== null || found !== undefined){
            res.status(200).json({
                success: true,
                blog: found
            })
        }else{
            res.status(404).json({
                success: true,
                blog: {}
            })
        }
    }catch(err){
        res.status(500).json({
            success: false,
            error: err.message
        })
    }


})

router.post('/create-one', (req, res)=>{
    console.log("create one blog is running");
    const blog = {
        title: req.body.title,
        text: req.body.text,
        author: req.body.author,
        category: req.body.category || [],
        createdAt: Date.now(),
        lastModified: Date.now(),
    }
    const checkBlog = blogValidator(blog);
    if(checkBlog.isValid === false){
       return  res.status(500).json({
            success: false,
            errors: checkBlog.errors
        })
    }
    sampleBlogs.push(blog);
    console.log(sampleBlogs);
    return res.status(201).json({
        success: true,
        isValid: checkBlog.isValid
    })

})
router.put('/update-one/:blogTitle', (req, res)=>{
    const indexFound = sampleBlogs.findIndex(blog=> blog.title === req.params.blogTitle);
    const blogFound = sampleBlogs[indexFound];
    const blogToUpdate = {...sampleBlogs[indexFound]};
    if(blogFound){
        Object.keys(blogToUpdate).forEach(key=>{

            if(Object.keys(blogToUpdate).includes(key)){
                if(blogToUpdate[key] !== req.body[key] && req.body[key] !== undefined){
                    // console.log("blogFound", blogFound[key]);
                    // console.log("key", key);
                    blogToUpdate[key] = req.body[key];
                    // console.log("updated", blogFound[key]);
                }
            }
        })
        console.log("original blog", blogFound);
        console.log("updated blog", blogToUpdate);
    }else{
        return res.json({
            success: false,
            message: "blog not found"
        })
    }

    const checkBlog = blogValidator(blogFound);

    if(checkBlog.isValid === false){
        return res.status(500).json({
            success: false,
            errors: checkBlog.errors
        })
    }
    if(JSON.stringify(blogFound) === JSON.stringify(blogToUpdate)){
        return res.status(200).json({
            success: true,
            message: "not updated"
        })
    }
    console.log(blogFound, blogToUpdate);
    sampleBlogs.splice(indexFound, 1, blogToUpdate);
    // console.log(sampleBlogs);
    return res.status(201).json({
        success: true,
        isValid: checkBlog.isValid
    })

})
router.delete("/single/:titleToDelete", function(req, res, next){
    let titleToDelete;
    if(req.params.titleToDelete){
        titleToDelete = req.params.titleToDelete;
    }else{
        throw "must enter a title";
    }

    try{
        const found = sampleBlogs.findIndex(blog=>titleToDelete === blog.title);
        if(found !== null || found !== undefined){
            res.status(200).json({
                success: true
            })
        }else{
            res.status(404).json({
                success: true,
                message: "blog not found"
            })
        }
    }catch(err){
        res.status(500).json({
            success: false,
            error: err.message
        })
    }


})


module.exports = router;
