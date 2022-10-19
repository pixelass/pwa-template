Feature: Collapsible Navigation

	As a user,
	I want a collapsible navigation,
	so that I can focus on the page.

	Scenario: The user wants to navigate from the sidebar
		Given the user is logged in
		And the user is on the root page
		Then the user sees the sidebar
		When the clicks on collapse
		Then the user sees the sidebar collapsed
		When the clicks on collapse
		Then the user sees the sidebar
