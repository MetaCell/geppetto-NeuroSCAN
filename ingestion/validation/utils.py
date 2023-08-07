def write_issues_to_log(issues, log_file_path):
    with open(log_file_path, 'w') as log_file:
        for app, app_issues in issues.items():
            log_file.write(f"==== {app.upper()} ISSUES ====\n")
            for entity, entity_issues in app_issues.items():
                if entity_issues:
                    log_file.write(f"--- {entity.capitalize()} Issues ---\n")
                    for issue in entity_issues:
                        log_file.write(f"{issue}\n")
                    log_file.write("\n")
            log_file.write("\n")