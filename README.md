<div align="center">
  <a href="https://github.com/vinsonio0920/file-uploader" style="list-style: none;">
    <img src="https://github.com/user-attachments/assets/bc6a5b00-cdb7-4b8d-b04d-a432065c4e91" alt="Alimente logo" width="100" height="100">
    <!-- Created with Inkscape (http://www.inkscape.org/) -->
  </a>
  
  <h3 align="center" style="list-style: none;">File Uploader</h3>
  
  <p align="center">
    A simple file uploader website where users can post and share their favorite foods
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#features">Features</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li>
      <a href="#lessons-learned">Lessons Learned</a>
      <ul>
        <li><a href="#scope-creep">Scope Creep</a></li>
        <li><a href="#project-planning">Project Planning</a></li>
        <li><a href="#sunk-cost-fallacy">Sunk-Cost Fallacy</a></li>
        <li><a href="#conclusion">Conclusion</a></li>
      </ul>
    </li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

## About the project

<img width="1710" height="857" alt="Screenshot overview of File Uploader homepage" src="https://github.com/user-attachments/assets/f7809c51-1b53-4063-8942-bd2a31c7b243" />
<p align="center">
  <a href="https://file-uploader-x5xr.onrender.com/">Visit the website</a>
</p>
<br />

This project focuses primarily on working with Prisma ORM. With Prisma, it's easier to keep track of the project's database and it helps make tedious SQL constructs much easier to write and use. All in all, Prisma ORM helps to centralize our database and place them in the same place as our code, making our project's workflow much smoother and easier than without it.

In addition, this project also deals with using files in our forms and subsequently handling it in the back-end. [Multer](https://github.com/expressjs/multer) is used in our form to be able to read `multipart/form-data` files which are then stored in (Supabase)[https://supabase.com/], an open source cloud storage service, for later retrieval. Through this project, I was also able to delve deeper into files, blobs, buffers, and many other new tools regarding files in JavaScript.

Passport.js is implemented along with the Prisma session store library to keep track of the user's session as they use the website. By being logged in, they will have access to create, read, update, and delete (CRUD) posts and folders. Regular users will be limited to seeing posts and they must be signed in to see folders and their contents unless shared.

This project took me **way too long**, but it brought fruit to many great lessons nonetheless. I hurt myself through bad habits while at the same time learning new tools and good habits that will serve me well in the future. Most importantly, I will strive to not make any of the mistakes here due to their consequences which you can read more in the Lessons Learned section. Even when I felt like quitting, I still crawled my way to completion. For that, this project will always hold a special place in my heart. Have a good day.

### Built With

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![CSS](https://img.shields.io/badge/css-%23663399.svg?style=for-the-badge&logo=css&logoColor=white)
![EJS](https://img.shields.io/badge/ejs-%23B4CA65.svg?style=for-the-badge&logo=ejs&logoColor=black)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Prettier](https://img.shields.io/badge/prettier-%23192a32?style=for-the-badge&logo=prettier&logoColor=dc524a)
* Plus Passport.js!


## Features

- Prisma ORM to centralize the database and the codebase together as well as to simplify SQL queries
- Use of Passport.js and its Local Strategy to store and keep track of user authentication
- Prisma session store to store the user's session
- Create, read, update, and delete (CRUD) posts and folders
- Ability to link multiple files to a given post and display them
- Ability to scroll through multiple images in a post
- Ability to share folders with users who are not signed in, along with an expiration date for them
- Routes to view posts, folder, and more
- Custom error handling
- Handle multipart encoded file data in Express and store them on the cloud through Supabase
- And much more

## Getting Started

To get started building with this project, follow the steps below!

### Prerequisites

* Make sure you have Node.js installed on your local computer
* Create a Supabase account to store your files on the cloud!
* Clone the repository to your local computer
```sh
  git clone git@github.com:vinsonio0920/file-uploader.git
```

### Installation

1. Move to the project directory
```sh
  cd file-uploader
```
2. Create a `.env` file to store your environment variables
3. Grab your Supabase url from your project (Projects -> Project Dashboard -> Project Settings -> Data API -> \<URL value>) and place it inside your `.env` file
```sh
  SUPABASE_URL="<Your URL here>"
```
5. Grab your Supabase key from your project (Projects -> Project Dashboard -> Project Settings -> API Keys -> Secret Keys -> \<Get secret key value>) and place it in your `.env` file
```sh
  SUPABASE_KEY="<Your secret key here>"
```
7. Create a database in postgres, with the code below being an example in psql (Don't forget the semicolon!)
```sh
  yourusername=# CREATE DATABASE file_uploader;
```
9. Add your postgres connection string as an environment variable in `.env`, changing the values to match your information
```sh
 DATABASE_URL="postgresql://<role_name>:<role_password>@localhost:5432/file_uploader"
```
10. Add a secret value in your `.env`. this is the last one, promise!
```sh
 SECRET="Whatever you want here!"
```
12. Run the build script. This will install all dependencies and packages, set up Prisma ORM and its migrations, and populate the database with initial data.
```sh
  npm run build
```
13. Finally, you are all ready to go! Simply run the project in your terminal and visit localhost:3000 to see it come to life!
```sh
  node --watch app.js
```

Side note: if you're deploying this website, make sure to change your `DATABASE_URL` to the internal URL of your production postgres database! Also feel free to change your port by setting a `PORT` environment value in your `.env` file. Enjoy!

## Roadmap
- [x] Show folder relation in post(s)
- [x] Complete share view
- [x] Add custom error page
- [x] Fix `populatedb.js` script
- [x] Add date on folder detail and post list
- [ ] Refactor CSS and JS, as there were many duplicate functions used across the website
- [ ] Add post edit functionality
- [ ] Redirect users back to the page they intend to go (after initial redirect to log in page)
- [ ] Show all shares of a particular folder
- [ ] Add footer
- [ ] Handle routes to `/share/installHook.js` and `favicon.ico`
- [ ] Optimize code

## Lessons Learned

This project was a genuine waste of time. After all, there was no reason for this simple learning project to take almost 4 whole months (that's an entire quarter of an year!) to complete. I don't regret completing this project or any of the process that went into completing it, but a culmination of bad choices led the project to take longer than I ever thought possible.

While it pains me to think upon the precious and valuable time that has drained, there were many important lessons that I learned from the completion of my file uploader website. In this section, I'll narrow it to the three most important lessons that I've come up with after some brief reflections. The main point of these three ties to how they all led to me wasting time upon time on what was supposed to be a "learning project."

### Scope Creep

By far the largest culprit in the time sink is the topic of scope creep. I've actually given some thoughts to this topic in previous projects, but I never thought it would hit as hard as it did right now. Here's the thing: this project was a **file uploader** project, not some pseudo social media site that I ended up with. The goals of this project was to simply learn about Prisma ORM and handling files in JavaScript but I took it one notch further. No harm done right? After all, I would be learning extra this way! Wrong.

The curriculum that I'm following for web development, The Odin Project, was carefully curated to make the projects manageable and easy to digest. In my arrogance, I decided that I was better than that and implemented more features than necessary. This ended up as you'd expect, with my project's time of completion ballooning an extra few months. This would've been all fine and dandy except for the fact that I do not have all the time in the world to spend on this project. In combination with my personal life and a sprinkle of procrastination, I've wasted valuable time thinking I'm learning faster but actually hindering my progress.

That is to say in conclusion, I should've humbled myself and realize that the project was outlined that way for a reason. I've been able to get away with adding extra features for my smaller projects, but with something as complex as the file uploader I'm working on, each feature would naturally much longer. In the future, I'll keep this mistake fresh in my mind and strive to go against scope creep in order to finish my project in time. After all, I didn't even bust out React with the website which would've made it so much cooler.

### Project Planning

So how might I prevent scope creep you ask? The answer is simple: project planning. But wait a minute, didn't I already say that in my previous few projects? The answer? Well, yes. But I only did it in the beginning and half-heartedly so. I knew all along from many master programmers that planning then dividing and conquering is the way to go. However, when I actually implemented it I just only focused on the beginning parts of the project and a simple design of the completed websites. What about the rest? What about dividing and conquering? In the end, I thought I could fill in the rest by myself, so I decided to forego any extra planning.

Big mistake. As time went on, I eventually forgot the things I did as well as the things I was supposed to do. Without dividing and conquering my project into chunks and working on them one piece at a time, I was forced to confront the whole piece and juggle many functionalities at the same time. This inevitably led to many bugs and less foundationally sound code which went and bit me in the future. Towards the end, I couldn't even keep track of my project anymore and my code was starting crumble into pieces. It was not a good time for me at all and was the second biggest contributor to my project being bloated and a time sink. Worst part? It all could've been solved had I actually spent some time project planning.

### Sunk-Cost Fallacy

So with all these extra features and stuff that I knew too late were just going to hinder me what should I have done? Looking back on it, I should've cut out all of those extra features when I had the time to. Did I mention that I had multiple of those "times" to scale back when I knew how much work those features would take? Well, even then I decided that it wasn't worth scaling back despite the fact that it would've save me much more time than if I kept going.

Despite that it was the right thing to do, that I knew early on the dangers I was getting myself into, and the fact that I had multiple chances to scale back, I didn't. The pain of all my time wasted on the feature going down the drain overcame the clear benefits of scaling back and saving me more time than I wasted. In the end these repeated instances of sunk-cost fallacy kept me on the road to wasting time, leading to the project we have today. The lesson here is simple: do not fall for sunk-cost fallacy if I can. I can also make it much easier for me by focusing on a minimum viable product (MVP) and finishing it before adding any extra features or polish.

### Conclusion

Those were the three main lessons that I'll keep in mind for eternity. I *would* say the foreseeable futures, but these lessons are genuinely much more than that. I regret the time I could've saved, but I don't regret the lessons here today. As they say, experience is the best teacher. I've learned more here through my failures rather than my successes and I'm all the more grateful for that. With these new knowledge and expertise I've gained, I'll move onto the next project. And the next. And the next... See y'all!

## Acknowledgments
Thank you to all the programmers out there! Without y'all, this project probably won't be as great. This section is dedicated to thanking the resources that helped make this project possible and I hope that they'll keep me company as I grow and get better. Thanks again and without further ado, here are some resources that I would like to shout out.

* [The Odin Project](https://www.theodinproject.com/dashboard) - The curriculum that I am taking for web development and the source of all my knowledge. Without it, I wouldn't know where to start and would've been stuck in tutorial hell.
* [Stack Overflow](https://stackoverflow.com/) - If StackOverflow has a million fans, then I am one of them. If StackOverflow has ten fans, then I am one of them. If StackOverflow has only one fan then that is me. If StackOverflow has no fans, then that means I am no longer on earth. If the world is against StackOverflow, then I am against the world.
* [ChatGPT](https://chatgpt.com/) - There's a time and place for everything, even AI even if it pains me to admit it. I try not to use it as I'm trying to learn and do things by myself, but when push comes to shove, nobody got me like ChatGPT does. I only use it when after hours of debugging + no solutions online ChatGPT solves it in one quick prompt. Thanks!
* [Multer](https://github.com/expressjs/multer) - A node.js middleware that handles the hard part of reading and parsing `multipart/form-data` for us. Without it, Express won't be able to understand the data passed to it from the form.
* [Date-fns](https://date-fns.org/) - The tried and true date library for formatting my date. It saves me precious time to spend elsewhere... Anyways it makes formatting dates so much easier compared to the old and verbose way.
* [Best-README-Template](https://github.com/othneildrew/Best-README-Template/blob/main/README.md?plain=1) - The README.md template that I am basing my readme out of. It looks awesome already! Makes me feel much more confident and capable in myself.
* [Markdown-badges](https://github.com/Ileriayo/markdown-badges) - Wondered how I got those shiny looking badges in my "Built With" section? Look no further!
* [Express-validator](https://express-validator.github.io/docs/) - The server-side form validator I use for all of my forms from the beginning. Easy and simple to use.
* [base64-arraybuffer](https://github.com/niklasvh/base64-arraybuffer) - Used to convert the input files into node.js' ArrayBuffer object. Without it, node wouldn't be able to understand the file that was passed!
* [dotenv](https://www.npmjs.com/package/dotenv) - Probably the most popular environment variable module. What else can I say?
* [bcryptjs](https://www.npmjs.com/package/bcryptjs) - The BEST password library to help salt and make your databases' passwords secure
* [mime](https://www.npmjs.com/package/mime) - A library that gets MIME information from the file name itself. Again a great quality of life library to make your life so much easier!
