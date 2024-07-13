let fieldsets = $('.fieldset')

$('.dbxz').remove() // remove all 打包下载 button

let threadTitle = ''
let metas = $('meta')
metas.each(function(index) {
    if ($(this).attr('name') === 'description') {
        threadTitle = $(this).attr('content').replace("<", "-")
        .replace(">", "-")
        .replace(":", "-")
        .replace("\"", "-")
        .replace("/", "-")
        .replace("|", "-")
        .replace("?", "-")
        .replace("*", "-")
    }
})

fieldsets.each(function(index) {
    const floor = $(this).parent().parent().find('.floor-parent').text().trim()
    let fileHrefs = $(this).find('a')
    let realLinks = []
    fileHrefs.each(function(index) {
        const realLinkName = $(this).text().trim().replace("<", "-")
        .replace(">", "-")
        .replace(":", "-")
        .replace("\"", "-")
        .replace("/", "-")
        .replace("|", "-")
        .replace("?", "-")
        .replace("*", "-")
        const realLink = window.location.protocol + "//" + window.location.hostname + "/" + $(this).attr('href')
        realLinks.push({
            realLinkName,
            realLink
        })
    })
    let dbxz = $("<button type='button' class='btn btn-primary dbxz'>打包下载</button>")
    let downloadLoading = $("<span class='spinner-grow spinner-grow-sm' aria-hidden='true'></span><span role='status'>下载中...</span>")
    dbxz.click(function() {
        dbxz.text('')
        dbxz.append(downloadLoading)
        getMultiBlobContent(realLinks,threadTitle + '-' + floor,'').then(() => {
            downloadLoading.remove()
            dbxz.text('打包下载')
        })
    })
    $(this).append(dbxz)

})