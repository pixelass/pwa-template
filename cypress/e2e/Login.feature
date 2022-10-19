Feature: Login

	As a user,
	I want to login,
	so that I can can access my account.

	Scenario: The user wants to access their profile
		Given the user is logged in
		And the user is on the root page
		Then the user is on the dashboard page
