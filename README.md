# Login-system for Video Streaming APP
* Made a login system for the video streaming app like netflix or amazon prime.
* User can register(SignUp), login and logout from the application without any security concern.
* Used **handlebar** as view template.
* Application is made by **node js** and for storing the user details **mysql database** is used.
* In order to hash the user password i used **brcypt library**. 

<img src="https://i.imgur.com/q3g2FeX.gif" width="850" height="550"/>


<h1><u>Structure</u></h1>
<h3>Features of this node js application</h3><br>
<li> allow secure login/register system with user saved in my sql database.</li>
<li> No user password is saved in database which allows secure login only by the autherized person and restrict the creator to access user passwords.</li>
<li> This has been done by bcrypt library enabling onyl the hashed password to get stored not the actual one.</li>
<li>Cookies has been used for user login session which have certain life to be retained.</li>

<h3>Why Mysql database ? </h3>
<li>More flexible</l1>
<li>Easy to use</l1>
<li>Easier query commands</l1>
