/*
What is the meaning of this versioning system
"version": "^4.19.2",
for eg above is the version of Node.js and it has 3 values seperated by 3 dots

^ -> Carrot Symbols
1st part -> 4
2nd part -> 19
3rd part -> 2

//3rd Part (Last Part) means - Minor Fixes (Optional) updating or not updating won't effect the code

//2nd part - Recommended Bug Fix (Security Fix) , here it is 19 which means it must to update the code as there are bug fixes
Latest -> 4.19.2

//1st means Major Release - Major / Breaking Update
Installing this new version or working with this version is recommended only when working with new project
//Updating in existing code might break the entire code

//How to install express of version of our choice
npm install express@4.17.2


^This carrot symbol basically fixes the 1st part of versioning and updates the 2nd and 3rd part accordingly as the new version comes
But the 1st part will not be updated to 5 

if I write version without ^ symbol in package.json file then it will not be updated and I will have to manually update it.

if we write ~ in place of ^ then we fix the 2nd part of version also and now only 3rd part will update.

we can also write > < and logical operators in versioning
*/
