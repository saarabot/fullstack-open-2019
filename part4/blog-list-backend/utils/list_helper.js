const _ = require('lodash');
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return blogs.reduce(reducer, 0) 
}

const favoriteBlog = (blogs) => {
    const desc = (a, b) => {
        return b.likes-a.likes
    }
    blogs.sort(desc)
    const favorite = {
        title: blogs[0].title,
        author: blogs[0].author,
        likes: blogs[0].likes,
    }
    return favorite;
}

const mostBlogs = (blogs) => {
    const grouped = _.chain(blogs)
                    .groupBy("author")
                    .toPairs()
                    .map((item) => {
                        return _.zipObject(_.zip(["author", "blogs"]), item)
                    })
                    .value();

    const desc = (a, b) => {
        return b.blogs.length-a.blogs.length
    }
    grouped.sort(desc)
    return {"author": grouped[0].author, "blogs": grouped[0].blogs.length}
}

const mostLikes = (blogs) => {
    const grouped = _.chain(blogs)
                    .groupBy("author")
                    .toPairs()
                    .map((item) => {
                        return _.zipObject(_.zip(["author", "blogs"]), item)
                    })
                    .value();
    
    let mostLikes = {author: '', likes: 0};
    _.forEach(grouped, (value) => {
        let temp = totalLikes(value.blogs)
        if(temp > mostLikes.likes) {
            mostLikes = {
                author: value.author,
                likes: temp
            }
        }
    })
    return mostLikes;

}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}