<!-- Answers to the Short Answer Essay Questions go here -->

1.  Describe Middleware, Sessions (as we know them in express), bcrypt and JWT.
Middleware is a function that takes a request of some sort, and uses it to modify that request somehow, or perform side effects based off of it. Usually middleware passes on the original or altered request to final endpoint handlers when used in Express.

Bcrypt is an algorithm for hashing. It offers auto-salting features, and adjustable Cost to slow down speed of hashing as necessary. It both creates hashes, and has built in functionality to compare a password to its hashed version.

JWT stands for JSON Web Tokens and refers to encrypted strings consisting of three parts, that when unencrypted form JSON detailining header information, a secret, and payload information. They allow application state information to be held within the web token rather than on a server using sessions.

2.  What does bcrypt do in order to prevent attacks?
Bcrypt adds salting to a password to prevent rainbow attacks on short passwords. It then performs hashing so that a password cannot be decoded. Future tests will be performed by applying the same hashing algorithm to new password attempts and comparing to the hash, rather than attempting to decrypt the password.

3.  What are the three parts of the JSON Web Token?
The three parts of JSON Web Tokens are headers (with meta-information about the content), payload (with server specified information about the user/session/etc.), and signature (which includes encoding information to verify authenticity.)
