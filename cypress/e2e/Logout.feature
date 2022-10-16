Feature: Logout

	As a user,
	I want to logout,
	so that I can keep my account secured.

	Scenario: The user wants to logout of their profile
		Given the user is logged in
		And the user is on the root page
		When the user logs out
		Then the user is on the login page
