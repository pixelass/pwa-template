Feature: Mobile Navigation

	As a user,
	I want a toggleable mobile navigation,
	so that I can show it when I need it.

	Scenario: The user wants to open the mobile menu
		Given the user is logged in
		And the user is on mobile
		And the user is on the root page
		Then the user sees the mobile sidebar button
		When the user click the mobile sidebar button
		Then the user sees the mobile sidebar

