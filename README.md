# reactNative Case Study - Aora
The creation of Aora was guided by a thorough tutorial that provided a structured learning path on Expo React Native. It was instrumental in understanding and implementing core functionalities such as Views, navigation systems, and authentication processes.

# Some notable findings:
## Routing and Navigation
it follows closely with Next.js's way of navigating using the app folder, _layouts, nested navigation and (groups). ReactNative and Expo use stacks (push, replace, etc.) methods to navigate through the application. I use this grouping with (auth) for authentication components and then (tabs) for the bottom navigation. One really cool functionality was the use of the Tabs tag to automatically form the navigation bar based on the .jsx's or components within the (tabs) folder. Compared to Flutter the routing and navigation feel more intuitive and require less boiler plate for it to work - especially when it comes to nested navigations.

## State management and Global Context 
The useGlobalContext hook was used to check the user session. The values provided to the GlobalContext.Provider would be used to persist data across all the child components. This context was wrapped around the entirety of the app and it's screens defined in the root _layout.jsx.

## Hooks
Hooks were used to manage the state of data. From useState, useEffect, useContext, and even a custom one called useAppWrite were used. My experience with Next.js and React carries over well into ReactNative. useAppWrite is a custom hook that was created for communicating with AppWrite. I used it to get data from the storage or database on initial pages. 

## Misc
## Styling
NativeWind is what I used to primarily style components to make it more intuitive, user friendly and over-all easier on the eyes. My experience with TailWind carries over well into NativeWind. I prefer this over other styling due to it's extensive library and how it trims what isn't used from the bundle - saving more memory. 

# Overall 
The over all experience feels a lot more smooth as a lot of the concepts I've learned from React carry over well. As a person who's used both Flutter and ReactNative, I feel that ReactNative has an easier barrier of entry if you know some web frameworks already. Navigating is a lot more intuitive in ReactNative, but the tooling and amount of built in libraries from the Flutter Ecosystem is where it shines.  

I think if I were to do this again in the future for a personal project, I would try to use it with AWS and/or Firebase. I like how lightweight ReactNative feels whereas Flutter can feel overwhelming to start.

