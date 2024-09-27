# Project 1 - Weather App
Our app is a simple weather application that displays the current day's weather and a week-long forecast for some major cities in Norway, as well as a few capital cities in Europe. The app offers up-to-date weather information for the current day, which includes details like temperature, precipitation, and wind, as well as icons about conditions such as sunny, cloudy, or rainy. Users can check the immediate weather conditions in their chosen locations. In addition to the current day's weather, the app also offers a seven-day forecast. This forecast provides users with an overview of expected weather conditions for the week, helping them plan activities and make informed decisions. The user is also able to choose favorites, and look at those favorite markings explicitly.

## Building and Running the Project
To get started, run the following commands in the following order:

| Command                                                                       | Description                                        |
| ----------------------------------------------------------------------------- | -------------------------------------------------- |
| `git clone https://gitlab.stud.idi.ntnu.no/it2810-h23/Team-22/project_1.git ` | clone project                                      |
| `cd weatherApp`                                                               | navigate into root folder                          |
| `npm install`                                                                 | install dependencies                               |
| `npm run dev`                                                                 | run project in browser                             |

Or manually:

1. Create a folder on your machine in which you want the project to live, for example the folder "project_1"
2. Go to the GitLab repository https://gitlab.stud.idi.ntnu.no/it2810-h23/Team-22/project_1 and select "Clone" and copy the URL pertaining to "Clone with HTTPS".
3. Open the folder created in step 1 in a terminal and enter "git clone the-url-from-clone-with-https"
4. Wait until the cloning process is finished
5. Run "git pull" in the terminal just to be sure that you got everything from the repository
6. Run "git branch -a" to see all branches
7. Run "git checkout name-of-branch" to switch to another branch
8. Once you are in the desired branch make sure that you are in the "GoCart" folder. For example, if you created the folder "project_2" folder in step 1, you may want to run "cd GoCart" to enter the correct folder.
9. Run "npm install" and wait for the process to finish.
10. You can now run "npm run dev" to start a live server that should update everytime you make changes to the codebase.

Step 8 may  have to and step 9 and 10 certainly  have to be repeated everytime you start your IDE. 

## Prettier

Prettier is recomended to format on save. To activate follow these steps:

```
- Install Prettier extension
- Open settings for your VS Code
- Click on the formatting section of the Text Editor tab and enable Format on Save Mode.
- Highlight your code and right-click. Select Format Document. Once you click on Format Document, a dialog box will tell you to configure your code formatter. This is to set your default code formatter. Click on the configure button.
- After you click on configure, select Prettier as the default formatter.
```

Source for guided step by step tutorial: https://www.educative.io/answers/how-to-set-up-prettier-and-automatic-formatting-on-vs-code

Or use shift + alt + F to format

## Structure
The app is structured so that the various components that make up the website are organized into their own folders within shared folders with similar elements, as follows:
* The different pages are grouped under "pages"
* The various components that the different pages are built from are located under "components"
* The different tools used to assist in various parts are located under "utils"
* Icons are located under "assets"

The app itself is in "weatherApp/App.tsx."# webdev_weatherApp
