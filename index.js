const fs = require('fs')
const fetchRedmine = require('./fetchRedmine')
const sendMessage = require('./sendMessage')




const checkLastIssues = async () => {
  let lastIssue = await fs.readFileSync('./whitie.txt', 'utf8')
  console.log(`The last issue saved is #${lastIssue}`)

  console.log('Cheking Redmine..')
  let issues = await getAllIssues()
  //console.log(issues)

  for (let i = 0; i < issues.length; i++) {
    let issue = issues[i]
    if (issue.id > parseInt(lastIssue)) {
      sendIssue(issue)
      if (i + 1 == issues.length) fs.writeFileSync('./whitie.txt', issue.id.toString())
    }
  }

}




const getAllIssues = async () => {
  let result = await fetchRedmine()
  let rawIssues = result.data.issues
  let issues = []

  for (let issue in rawIssues) {
    let currentIssue = {
      id: rawIssues[issue].id,
      tracker: rawIssues[issue].tracker.name,
      subject: rawIssues[issue].subject
    }
  //Issues are received ordered by ID desc, saved ordered by ID asc
  issues.push(currentIssue)
  }

  issues.sort((a, b) => {
    return a.id - b.id
  })

  return issues
}





const sendIssue = issue => {

  //console.log(`Issue is sent: ${JSON.stringify(issue)}`)
  let tracker = issue.tracker == 'Support' ? '' : `\n*${issue.tracker}*`

  let message = `*New ticket* [#${issue.id}](https://******************************/issues/${issue.id}) *${tracker}* \n\`${issue.subject}\``

  console.log(message)

  sendMessage(message)


}

var intervalID = setInterval(checkLastIssues, 120000)

