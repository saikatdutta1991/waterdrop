exports.calculatePaging = async function (query, page, limit) {
    var q = Object.create(query)
    var count = await q.countDocuments().exec()
    var pagesCount = Math.ceil(count / limit)
    var currPage = page + 1


    var pageData = {
        total: count,
        limit: limit,
        currPage: currPage,
        pages: pagesCount,
        nextPage: currPage < pagesCount ? currPage + 1 : -1
    }

    return pageData

}


exports.currentPage = function (page) {
    return Math.max(1, page) - 1
}
