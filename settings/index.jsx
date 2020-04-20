function settingsComponent(props) {
  return (
    <Page>
      <Section
        title={
          <Text bold align="center">
            App Settings
          </Text>
        }
      >
        Some content
      </Section>
    </Page>
  );
}

registerSettingsPage(settingsComponent);
