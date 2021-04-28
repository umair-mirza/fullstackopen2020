// const blogs = [
//     {
//       _id: "5a422a851b54a676234d17f7",
//       title: "React patterns",
//       author: "Michael Chan",
//       url: "https://reactpatterns.com/",
//       likes: 7,
//       __v: 0
//     },
//     {
//       _id: "5a422aa71b54a676234d17f8",
//       title: "Go To Statement Considered Harmful",
//       author: "Edsger W. Dijkstra",
//       url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
//       likes: 5,
//       __v: 0
//     },
//     {
//       _id: "5a422b3a1b54a676234d17f9",
//       title: "Canonical string reduction",
//       author: "Edsger W. Dijkstra",
//       url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
//       likes: 12,
//       __v: 0
//     },
//     {
//       _id: "5a422b891b54a676234d17fa",
//       title: "First class tests",
//       author: "Robert C. Martin",
//       url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
//       likes: 10,
//       __v: 0
//     },
//     {
//       _id: "5a422ba71b54a676234d17fb",
//       title: "TDD harms architecture",
//       author: "Robert C. Martin",
//       url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
//       likes: 0,
//       __v: 0
//     },
//     {
//       _id: "5a422bc61b54a676234d17fc",
//       title: "Type wars",
//       author: "Robert C. Martin",
//       url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
//       likes: 2,
//       __v: 0
//     }  
//   ]

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likes = blogs.map(blog => blog.likes)
    
    const sum = likes.reduce((acc, val) => {
        return acc + val
    }, 0)

    return sum
}

const favoriteBlog = (blogs) => {
    const likes = blogs.map(blog => blog.likes)
    const greatest = Math.max(...likes)

    const favorite = blogs.find(blog => blog.likes === greatest)

    return favorite

}

const mostBlogs = (blogs) => {
    let authArray = []
    let count = 0
    let maxAuthor = {}
    
    for(let i = 0; i <= blogs.length-1; i++) {
        blogs.forEach(blog => {
            if(blog.author === blogs[i].author) {
                count = count + 1
            }
        })
        authArray.push([blogs[i].author, count])
        count = 0
    }

    const maxArray = authArray.find(auth => {
      return auth[1] === Math.max(...authArray.map(item => item[1]))
    })

    maxAuthor.author = maxArray[0]
    maxAuthor.blogs = maxArray[1]

    return maxAuthor
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}