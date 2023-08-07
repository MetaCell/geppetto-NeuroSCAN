from ingestion.validation.DatasetValidator import DatasetValidator


def test__valid_dataset_validator():
    # Validate using the DatasetValidator
    validator = DatasetValidator("./neuroscan_valid_dataset")
    issues = validator.validate()

    # Calculate the total number of issues
    total_issues = sum(len(issues_list) for issues_list in issues.values())

    # Assert that no issues were found
    assert total_issues == 0, f"Validation issues found: {issues}"


def test__invalid_dataset_validator():
    # Validate using the DatasetValidator
    validator = DatasetValidator("./neuroscan_invalid_dataset")
    issues = validator.validate()

    # Calculate the total number of issues
    total_issues = sum(len(issues_list) for issues_list in issues.values())

    # Assert that issues were found
    assert total_issues > 0, f"No validation issues found but were expected."
