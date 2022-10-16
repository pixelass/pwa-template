Feature: Navigation

	As a user,
	I want a navigation,
	so that I can easily navigate to important pages.

	Scenario: The user wants to navigate from the sidebar
		Given the user is logged in
		And the user is on the root page
		Then the user sees the sidebar
		When the clicks on profile
		Then the user is on the profile page
