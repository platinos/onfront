

## [Installation](https://platinos.github.io/SHEQ-Ionic/installation) [Docs](https://platinos.github.io/SHEQ-Ionic/docs)

## Design Guidelines

> “Design is not just what it looks like and feels like. Design is how it works.” - Steve Jobs


----
### Introduction
Sheq is a hybrid mobile application based on Ionic 3. Main target platforms for the app are iOS and Android. To enhance the look and feel of the app as well to provide great user experience, we need to follow certain standards for the App designing and development process.

1. [Minimize Cognitive Load ](#Minimize-Cognitive-Load)
2. [Decluttering](#decluttering)
3. [Offloading Tasks](#offloading)
4. [Use of Familiar Screens](#familar)
5. [Minimize User Input](#user-input)
6. [Use Visual Weight for Important Elements](#visual-weight)
7. [Consistency in Design](#consistency)
8. [Avoid Jargons](#jargons)
9. [Meaningful Error Messages](#errors)

<a id="Minimize-Cognitive-Load"></a>
###  Minimize Cognitive Load
Cognitive load refers here to the amount of brain power required to use the app. The human brain has a limited amount of processing power, and when an app provides too much information at once, it might overwhelm the user and make them abandon the task.

<a id="decluttering"></a>
### Decluttering 
Clutter is one of the worst enemies of good design. By cluttering your interface, you overload users with too much information: Every added button, image and icon makes the screen more complicated.
-   Keep content to a minimum (present the user with only what they need to know).
    
-   Keep interface elements to a minimum. A simple design will keep the user at ease with the product.
- Use the technique of progressive disclosure to show more options

<a id="offloading"></a>
### Offloading Tasks 

Look for anything in the design that requires user effort (this might be entering data, making a decision, etc.), and look for alternatives. For example, in some cases you can reuse previously entered data instead of asking the user to type more, or use already available information to set a smart default.

Chunking can also help to connect two different activities (such as browsing and purchasing). When a flow is presented as a number of steps logically connected to each other, the user can more easily proceed through it.

<a id="familiar"></a>
### Use of Familiar Screens 
Familiar screens are screens that users see in many apps. Screens such as “Gettings started,” “What’s new” and “Search results” have become de facto standards for mobile apps. They don’t require additional explanation because users are already familiar with them. This allows users to use prior experience to interact with the app, with no learning curve.

<a id="user-input"></a>
### Minimize User Input 
Typing on a small mobile screen isn’t the most comfortable experience. In fact, it’s often error-prone. And the most common case of user input is filling out a form. Here are a few practical recommendations to make this process easy:

-   Keep forms as short as possible by removing any unnecessary fields. The app should ask for only the bare minimum of information from the user.
-   Provide input masks. Field masking is a technique that helps users format inputted text. A mask appears once a user focuses on a field, and it formats the text automatically as the field is being filled out, helping users to focus on the required data and to more easily notice errors.
- Use smart features such as autocomplete.
- Dynamically validate field values. It’s frustrating when, after submitting data, you have to go back and correct mistakes. Whenever possible, check field values immediately after entry so that users can correct them right away.
- Customize the keyboard for the type of query. Display a numeric keyboard when asking for phone number, and include the @ button when asking for an email address. Ensure that this feature is implemented consistently throughout the app, rather than only for certain forms.

<a id="visual-weight"></a>
### Use Visual Weight for Important Elements 
The most important element on the screen should have the most visual weight. Adding more weight to an element is possible with font weight, size and color.

<a id="consistency"></a>
### Consistency in Design 
Consistency is a fundamental principle of design. Consistency eliminates confusion. Maintaining an overall consistent appearance throughout an app is essential. Regarding mobile app, consistency means the following:

-   **Visual consistency**  
    Typefaces, buttons and labels need to be consistent across the app.
    
-   **Functional consistency**  
    Interactive elements should work similarly in all parts of your app.
    
-   **External consistency**  
    Design should be consistent across multiple products. This way, the user can apply prior knowledge when using another product.

<a id="jargons"></a>
### Avoid Jargons 
Clear communication should always be a top priority in any mobile app. Use what you know about your target audience to determine whether certain words or phrases are appropriate.

<a id="errors"></a>
### Meaningful Error Messages 
To err is human. Errors occur when people engage with apps. Sometimes, they happen because the user makes a mistake. Sometimes, they happen because the app fails. Whatever the cause, these errors and how they are handled have a huge impact on the UX. Bad error handling paired with useless error messages can fill users with frustration and could be the reason why users abandon your app.
