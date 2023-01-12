export default [
  {
    group: "Stacked Layout (Recommended Template)",
    name: "Customizable",
    code: `
    <StackedLayout
      navigation={<TopNavigation>
      <TopNavigation.Navigation>
        <TopNavigation.Navigation.Item to="/dashboard">Dashboard</TopNavigation.Navigation.Item>
        <TopNavigation.Navigation.Item to="/team">Team</TopNavigation.Navigation.Item>
        <TopNavigation.Navigation.Item isExpandable={true} title={"Planning"}>
          <TopNavigation.Navigation.SubItem to="/tasks" icon={<Icon type="clipboard" />}>
            Tasks
          </TopNavigation.Navigation.SubItem>
          <TopNavigation.Navigation.SubItem to="/reminders">
            Reminders
          </TopNavigation.Navigation.SubItem>
          <TopNavigation.Navigation.SubItem to="/events">
           Events
          </TopNavigation.Navigation.SubItem>
        </TopNavigation.Navigation.Item>
      </TopNavigation.Navigation>
      <TopNavigation.Dropdown
        title="User"
        menuType="icon"
        icon="user"
        popupBackgroundColor="default"
        iconColor="default"
        buttonColor="primary"
        buttonVariant="text"
      >
        <TopNavigation.Dropdown.Item to="/account">Account</TopNavigation.Dropdown.Item>
        <TopNavigation.Dropdown.Item to="/support">Support</TopNavigation.Dropdown.Item>
        <TopNavigation.Dropdown.Item to="/logout">Sign Out</TopNavigation.Dropdown.Item>
      </TopNavigation.Dropdown>
    </TopNavigation>
      }
      containerConfig={{ type: "full-width" }}
    >
      <StackedLayout.Heading>
        <h3>Heading:</h3>
        <Placeholder className="w-full h-20" />
      </StackedLayout.Heading>
      <StackedLayout.Content>
        <h3>Content:</h3>
        <Placeholder className="w-full h-25" />
      </StackedLayout.Content>
    </StackedLayout>
   `,
  },
  {
    group: "Sidebar Layout (Recommended Template)",
    name: "Customizable",
    code: `
    <SidebarLayout
      navigation={
              <SidebarNavigation
        bottomActions={
          <>
            <SidebarNavigation.BottomAction to="/messages">Messages</SidebarNavigation.BottomAction>
            <SidebarNavigation.BottomAction to="/reports">Reports</SidebarNavigation.BottomAction>
          </>
        }
        topRightAction={
          <SidebarNavigation.Dropdown
            title="User"
            menuType="icon"
            icon="user"
            popupBackgroundColor="default"
            iconColor="default"
            buttonColor="primary"
            buttonVariant="text"
          >
            <SidebarNavigation.Dropdown.Item to="/account">Account</SidebarNavigation.Dropdown.Item>
            <SidebarNavigation.Dropdown.Item to="/support" color="default">
              Support
            </SidebarNavigation.Dropdown.Item>
            <SidebarNavigation.Dropdown.Item to="/logout" color="default">
              Sign Out
            </SidebarNavigation.Dropdown.Item>
          </SidebarNavigation.Dropdown>
        }
      >
        <SidebarNavigation.Item to="/dashboard">Dashboard</SidebarNavigation.Item>
        <SidebarNavigation.Item isExpandable={true} title="Planning">
          <SidebarNavigation.SubItem to="/tasks" icon={<Icon type="clipboard" />}>
            Tasks
          </SidebarNavigation.SubItem>
          <SidebarNavigation.SubItem to="/reminders" icon={<Icon type="bell" />}>
            Reminders
          </SidebarNavigation.SubItem>
          <SidebarNavigation.SubItem to="/events" icon={<Icon type="money" />}>
            Events
          </SidebarNavigation.SubItem>
        </SidebarNavigation.Item>
      </SidebarNavigation>
      }
      containerConfig={{ type: "full-width" }}
    >
      <SidebarLayout.Heading>
        <h3>Heading:</h3>
        <Placeholder className="w-full h-20" />
      </SidebarLayout.Heading>
      <SidebarLayout.Content>
        <h3>Content:</h3>
        <Placeholder className="w-full h-25" />
      </SidebarLayout.Content>
    </SidebarLayout>
   `,
  },
  {
    group: "Card (Recommended Component)",
    name: "Customizable",
    code: `
      <Card>
    <Card.Header>
      <Card.Header.Title>Title</Card.Header.Title>
      <Card.Header.Subtitle>Subtitle</Card.Header.Subtitle>
      <Card.Header.Actions>
        <Button>Create</Button>
        <Button>Delete</Button>
      </Card.Header.Actions>
    </Card.Header>
    <Card.Body>
      <Placeholder className="h-48" />
    </Card.Body>
    <Card.Footer>
      <div className="flex justify-end">
        <Button className="mr-3" variant="outlined" type="reset">
          Cancel
        </Button>
        <Button type="submit">Submit</Button>
      </div>
    </Card.Footer>
  </Card>
   `,
  },
  {
    group: "Container",
    name: "max | full-width | constrained-padded | full-width-container | narrow-constrained",
    code: `<Container config={{type: "full-width"}}>Content</Container>
    `,
  },
  {
    group: "Button",
    name: "Customizable",
    code: `  <Button variant="outlined" color="primary">
    Button
  </Button>
    `,
  },
  {
    group: "Button",
    name: "With Icon",
    code: `<Button variant="filled" trailingIcon={<Icon type="envelope" />}>
    Label
  </Button>
    `,
  },
  {
    group: "Button",
    name: "Disabled",
    code: `<Button variant="outlined" color="primary" disabled="true">
    Button
  </Button>
    `,
  },
  {
    group: "Badge",
    name: "Customizable",
    code: `
      <Badge color="red" rounded={false} dot={false}>Badge Text</Badge>
    `,
  },
  {
    group: "Page Heading",
    name: "Customizable",
    code: `
  <PageHeading>
    <PageHeading.Title>Title</PageHeading.Title>
    <PageHeading.Subtitle>Subtitle</PageHeading.Subtitle>
    <PageHeading.Actions>
      <Button variant="outlined" color="white">
        Edit
      </Button>
      <Button variant="filled">Publish</Button>
    </PageHeading.Actions>
  </PageHeading>
    `,
  },
  {
    group: "Pagination",
    name: "Customizable",
    code: `
    <Pagination pageNumber={0} pageSize={10} totalElements={20} />
    `,
  },
  {
    group: "Page Resizer",
    name: "Customizable",
    code: `
    <PageResizer pageSize={10} pageSizes={[3, 5, 10]} totalElements={20} onPageSizeChange={onPageSizeChange} />
    `,
  },
  {
    group: "Progress Bar",
    name: "Customizable",
    code: `
    <Card>
      <ProgressBar>
        <ProgressBar.Step active={false}>
          <span>STEP 1</span>
        </ProgressBar.Step>
        <ProgressBar.Step active={false}>
          <span>STEP 2</span>
        </ProgressBar.Step>
        <ProgressBar.Step active={true}>
          <span>STEP 3</span>
        </ProgressBar.Step>
        <ProgressBar.Step active={false}>
          <span>STEP 4</span>
        </ProgressBar.Step>
      </ProgressBar>
    </Card>
    `,
  },
  {
    group: "Typography",
    name: "Customizable",
    code: `
    <Typography variant="title" icon={<Icon type="envelope" />} left={false}>
      some text
    </Typography>
    `,
  },
  {
    group: "Tooltip",
    name: "Default",
    code: `
  <Tooltip label="more info">
    <p>Hover on me</p>
  </Tooltip>
    `,
  },
  {
    group: "Description List",
    name: "Default",
    code: `
    <DescriptionList>
    <DescriptionList.Item label="Full name" type="striped">
      Margot Foster
    </DescriptionList.Item>
    <DescriptionList.Item label="Application for">Backend Developer</DescriptionList.Item>
    <DescriptionList.Item label="Email address">margotfoster@example</DescriptionList.Item>
    <DescriptionList.Item label="Salary expectation">$120,000</DescriptionList.Item>
    <DescriptionList.Item label="About">
      Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum
      aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit
      ad adipisicing reprehenderit deserunt qui eu.
    </DescriptionList.Item>
    <DescriptionList.Item label="Crimes">Triple homicide in Reno, Nevada.</DescriptionList.Item>
    <DescriptionList.Item label="Guns used">.357 Magnum, Tactical knife, flashbang</DescriptionList.Item>
  </DescriptionList>
    `,
  },
  {
    group: "Data Table",
    name: "Example",
    code: `
  <DataTable data={[
    {
        "name": "Pero",
        "appliedFor": "Stalni zaposlenik",
        "datesBegin": "28. 08. 2021.",
        "datesEnd": "29. 09. 2021."
    },
    {
        "name": "Ivo",
        "appliedFor": "Vanjski suradnik 1",
        "datesBegin": "16. 08. 2021.",
        "datesEnd": "16. 09. 2021."
    },
    {
        "name": "Ana",
        "appliedFor": "Srednjoškolac",
        "datesBegin": "14. 08. 2021.",
        "datesEnd": "28. 09. 2021."
    },
    {
        "name": "Ivica",
        "appliedFor": "Vanjski suradnik 2",
        "datesBegin": "29. 08. 2021.",
        "datesEnd": "14. 09. 2021."
    }
]}>
    <DataTable.Column header="ZAPOSLENIK" accessor="name" />
    <DataTable.Column header="TIP ZAPOSLENIKA" accessor="appliedFor" />
    <DataTable.Column header="SLUŽBENI DATUM POČETKA" accessor="datesBegin" />
    <DataTable.Column header="SLUŽBENI DATUM ZAVRŠETKA" accessor="datesEnd" />
    <DataTable.Column header="AKCIJE" id="view" canSort={false}>
      {() => (
        <div className="flex justify-start items-center space-x-1">
          <IconButton type="pencil-alt" variant="outline" label="View" color="blue" />
          <IconButton type="trash" variant="solid" label="Erase" color="red" />
        </div>
      )}
    </DataTable.Column>
  </DataTable>
    `,
  },
  {
    group: "Checkbox Group",
    name: "Customizable",
    code: `
    <CheckboxGroupField
      name="filter"
      label="Sort By:"
      direction="horizontal"
    >
      <CheckboxGroupField.Item label="Name" value="name" />
      <CheckboxGroupField.Item label="Date" value="date" />
      <CheckboxGroupField.Item label="Type" value="type" />
    </CheckboxGroupField>
    `,
  },
  {
    group: "Checkbox Group",
    name: "With Info",
    code: `
  <CheckboxGroupField icon={<Icon type="info" />} 
  name="filter"
  label="Sort by:"
  direction="horizontal"
>
      <CheckboxGroupField.Item label="Name" value="name" />
      <CheckboxGroupField.Item label="Date" value="date" />
      <CheckboxGroupField.Item label="Type" value="type" />
</CheckboxGroupField>
    `,
  },
  {
    group: "Radio Group",
    name: "Customizable",
    code: `
            <RadioGroupField
              name="filter"
              label="Sort by:"
              className="sm:col-span-2"
              direction="horizontal"
            >
              <RadioGroupField.Item label="Name" value="name" />
              <RadioGroupField.Item label="Date" value="date" />
              <RadioGroupField.Item label="Type" value="type" />
            </RadioGroupField>
    `,
  },
  {
    group: "Radio Group",
    name: "With Info",
    code: `
              <RadioGroupField icon={<Icon type="info" />} 
              name="filter"
              label="Sort by:"
              className="sm:col-span-2"
              direction="horizontal"
            >
              <RadioGroupField.Item label="Name" value="name" />
              <RadioGroupField.Item label="Date" value="date" />
              <RadioGroupField.Item label="Type" value="type" />
            </RadioGroupField>
    `,
  },
  {
    group: "Input",
    name: "Default Input",
    code: `
        <InputField name="input" label="Name:" value="" placeholder="" help="" hint="" />
    `,
  },
  {
    group: "Input",
    name: "Date Input",
    code: `
        <DateInputField name="dateInput" label="Date:" value="" placeholder="" help="" hint="" />
    `,
  },
  {
    group: "Input",
    name: "Textarea Input",
    code: `
        <TextareaField name="textareaInput" label="About:" value="" placeholder="" help="" hint="" />
    `,
  },
  {
    group: "Input",
    name: "Autocomplete Input",
    code: `
        <AutocompleteField name="autocompleteInput" label="City:" value="" placeholder="" help="" hint="" />
    `,
  },
  {
    group: "Input",
    name: "TreeSelect Input",
    code: `
        <TreeSelectField name="treeSelectInput" label="Type:" value="" placeholder="" help="" hint="" />
    `,
  },
  {
    group: "Icon",
    name: "Customizable",
    code: `
        <Icon type="star" color="yellow" variant="solid" size={8}  />    `,
  },
  {
    group: "Top Navigation",
    name: "Customizable",
    code: `
        <ThemeProvider
          themeConfig={createThemeConfig({
            config: { component: { TopNavigation: { color: "indigo" } } },
          })}
        >
          <TopNavigation containerConfig={{ type: "full-width" }} logo={<svg width="143" height="32" viewBox="0 0 143 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.9852 28.4376C15.1797 27.9367 15.2725 27.4021 15.258 26.865C15.2877 25.3764 15.6855 23.9184 16.416 22.621C17.1447 21.3258 18.1838 20.2321 19.44 19.438C19.9051 19.1885 20.3148 18.8473 20.6442 18.4349C20.9737 18.0225 21.216 17.5476 21.3566 17.0389C21.4972 16.5301 21.5331 15.9982 21.4622 15.4751C21.3913 14.9521 21.215 14.4489 20.944 13.996C20.582 13.391 20.061 12.895 19.44 12.565C19.084 12.318 18.742 12.052 18.416 11.767L17.599 10.967C16.1019 9.3932 15.2624 7.30708 15.252 5.135C15.2675 4.59777 15.1752 4.06288 14.9806 3.56188C14.786 3.06089 14.493 2.60395 14.119 2.218C13.7466 1.83249 13.3004 1.52595 12.807 1.31668C12.3135 1.10742 11.783 0.999714 11.247 1C10.7113 1.00076 10.1812 1.10894 9.68811 1.31815C9.19497 1.52735 8.74881 1.83334 8.376 2.218C8.00262 2.60462 7.71011 3.06183 7.51556 3.56287C7.32102 4.06391 7.22836 4.59872 7.243 5.136C7.25174 5.83344 7.44384 6.5163 7.8 7.116C8.15494 7.71469 8.66169 8.20902 9.269 8.549C11.728 10.105 13.439 13.08 13.439 16.006C13.4329 18.1592 12.6094 20.2298 11.135 21.799L9.275 23.451C8.668 23.79 8.161 24.284 7.805 24.884C7.448 25.483 7.257 26.167 7.248 26.865C7.23271 27.4022 7.32507 27.9371 7.51965 28.438C7.71423 28.939 8.0071 29.396 8.381 29.782C8.75344 30.1674 9.19967 30.4739 9.6931 30.6832C10.1865 30.8924 10.717 31.0002 11.253 31C11.7888 30.9994 12.3191 30.8913 12.8124 30.682C13.3057 30.4728 13.7521 30.1668 14.125 29.782C14.4982 29.3955 14.7906 28.9384 14.9852 28.4376Z" fill="#1F2937"/>
<path d="M20.417 7.36C19.976 6.698 19.741 5.919 19.741 5.123C19.7417 4.05673 20.1641 3.034 20.916 2.278C21.5698 1.62024 22.4321 1.2105 23.355 1.11909C24.2779 1.02768 25.2039 1.26028 25.974 1.777C26.6337 2.2199 27.1473 2.84836 27.45 3.583C27.7527 4.31848 27.8318 5.12692 27.6772 5.9071C27.5226 6.68728 27.1413 7.40452 26.581 7.969C26.0224 8.53193 25.3087 8.91563 24.5311 9.07112C23.7535 9.22661 22.9471 9.14685 22.215 8.842C21.4822 8.53685 20.8564 8.02107 20.417 7.36Z" fill="#1F2937"/>
<path d="M21.522 23.518C22.181 23.076 22.956 22.84 23.748 22.84V22.838C24.2745 22.8386 24.7957 22.9432 25.2816 23.1457C25.7676 23.3482 26.2088 23.6446 26.58 24.018C27.2359 24.6779 27.6439 25.544 27.735 26.47C27.8261 27.3959 27.5948 28.3249 27.08 29.1C26.6406 29.762 26.0144 30.2785 25.281 30.584C24.5489 30.8888 23.7426 30.9686 22.9649 30.8131C22.1873 30.6576 21.4736 30.2739 20.915 29.711C20.3545 29.1464 19.9731 28.429 19.8185 27.6486C19.6639 26.8683 19.743 26.0596 20.046 25.324C20.3488 24.5894 20.8624 23.9609 21.522 23.518Z" fill="#1F2937"/>
<path d="M33.325 13.758C33.7648 14.4198 33.9998 15.1974 34 15.9931C33.9993 17.0597 33.577 18.0827 32.825 18.839C32.4537 19.2122 32.0125 19.5086 31.5265 19.7111C31.0406 19.9136 30.5195 20.0182 29.993 20.019C29.2001 20.019 28.4252 19.783 27.767 19.341C27.1073 18.8981 26.5937 18.2696 26.291 17.535C25.9881 16.7994 25.9089 15.9907 26.0635 15.2104C26.2181 14.43 26.5995 13.7126 27.16 13.148C27.7187 12.5849 28.4325 12.2011 29.2104 12.0456C29.9882 11.8901 30.7948 11.9699 31.527 12.275C32.2599 12.5804 32.8857 13.0966 33.325 13.758Z" fill="#1F2937"/>
<path d="M2.781 12.647C3.44 12.205 4.214 11.969 5.007 11.969C5.53335 11.9701 6.05431 12.075 6.54008 12.2776C7.02585 12.4803 7.46691 12.7767 7.838 13.15C8.49361 13.8097 8.90142 14.6754 8.99252 15.601C9.08362 16.5265 8.85243 17.4552 8.338 18.23C7.89867 18.8914 7.27291 19.4075 6.54 19.713C5.80764 20.0164 5.00167 20.0953 4.22435 19.9399C3.44703 19.7845 2.7334 19.4017 2.174 18.84C1.6137 18.2755 1.23239 17.5583 1.07782 16.7781C0.923238 15.9979 1.00227 15.1895 1.305 14.454C1.60759 13.719 2.12122 13.0902 2.781 12.647Z" fill="#1F2937"/>
<path d="M58.664 11.136L56.624 18.528L54.44 11.136H51.512L49.328 18.504L47.288 11.136H44L47.816 23.136H50.768L52.976 15.864L55.184 23.136H58.136L61.952 11.136H58.664ZM68.864 23.472C72.392 23.472 75.224 20.712 75.224 17.136C75.224 13.56 72.392 10.8 68.864 10.8C65.336 10.8 62.528 13.56 62.528 17.136C62.528 20.712 65.336 23.472 68.864 23.472ZM68.864 20.448C67.04 20.448 65.624 19.08 65.624 17.136C65.624 15.192 67.04 13.824 68.864 13.824C70.712 13.824 72.128 15.192 72.128 17.136C72.128 19.08 70.712 20.448 68.864 20.448ZM80.498 13.2V11.136H77.402V23.136H80.498V17.4C80.498 14.88 82.538 14.16 84.146 14.352V10.896C82.634 10.896 81.122 11.568 80.498 13.2ZM97.02 23.136L92.053 17.064L96.877 11.136H93.18L89.052 16.416V6.336H85.956V23.136H89.052V17.688L93.42 23.136H97.02ZM105.022 6C101.206 6 99.382 7.704 99.382 11.016V11.136H97.654V14.112H99.382V23.136H102.478V14.112H104.47V11.136H102.478V11.016C102.478 9.384 103.414 8.712 105.022 8.712C105.334 8.712 105.67 8.712 106.006 8.736V23.136H109.102V6.504C107.782 6.24 106.534 6 105.022 6ZM117.637 23.472C121.165 23.472 123.997 20.712 123.997 17.136C123.997 13.56 121.165 10.8 117.637 10.8C114.109 10.8 111.301 13.56 111.301 17.136C111.301 20.712 114.109 23.472 117.637 23.472ZM117.637 20.448C115.813 20.448 114.397 19.08 114.397 17.136C114.397 15.192 115.813 13.824 117.637 13.824C119.485 13.824 120.901 15.192 120.901 17.136C120.901 19.08 119.485 20.448 117.637 20.448ZM139.219 11.136L137.179 18.528L134.995 11.136H132.067L129.883 18.504L127.843 11.136H124.555L128.371 23.136H131.323L133.531 15.864L135.739 23.136H138.691L142.507 11.136H139.219Z" fill="#1F2937"/>
</svg>}>
            <TopNavigation.Navigation>
              <TopNavigation.Navigation.Item>
                Menu Item 1
              </TopNavigation.Navigation.Item>
              <TopNavigation.Navigation.Item>
                Menu Item 2
              </TopNavigation.Navigation.Item>
            </TopNavigation.Navigation>
            <TopNavigation.Dropdown title="User">
              <TopNavigation.Dropdown.Item>Account</TopNavigation.Dropdown.Item>
              <TopNavigation.Dropdown.Item>Support</TopNavigation.Dropdown.Item>
              <TopNavigation.Dropdown.Item>Sign Out</TopNavigation.Dropdown.Item>
            </TopNavigation.Dropdown>
          </TopNavigation>
        </ThemeProvider>
   `,
  },
  {
    group: "Form Layout",
    name: "Filter",
    code: `
    <FormLayout type="card">
      <FormLayout.Section title="" subtitle="" borderless={false}>
        <FormLayout.Section.Content>
          <div className="grid grid-cols-1 row-gap-6 col-gap-4 sm:grid-cols-3">
            <InputField name="name" label="Ime" />
            <DateInputField name="date" label="Datum početka/kraja" />
            <SelectField name="type" options={["zaposlenik1", "zaposlenik2"]} label="Tip zaposlenika" />
          </div>
          <div className="inline-flex items-center space-x-1">
            <CheckboxField name="hide" label="Sakrij" />
          </div>
        </FormLayout.Section.Content>
        <FormLayout.Section.Actions>
          <Button variant="outlined">Resetiraj filter</Button>
          <Button variant="filled">Potvrdi</Button>
        </FormLayout.Section.Actions>
      </FormLayout.Section>
  </FormLayout>
   `,
  },
  {
    group: "Form Layout",
    name: "Filter Advanced",
    code: `
     <FormLayout type="card">
      <FormLayout.Section title="" subtitle="" borderless={false}>
        <FormLayout.Section.Content>
          <div className="grid grid-cols-1 row-gap-6 col-gap-4 sm:grid-cols-6">
            <InputField
              name="status"
              label="Status"
              help="Pretraži naziv ponude"
              className="sm:col-span-4"
            />
            <CheckboxGroupField
              name="filter"
              label="Pretraži prema:"
              direction="horizontal"
            >
              <CheckboxGroupField.Item
                label="Naziv ponude"
                value="title"
              />
              <CheckboxGroupField.Item
                label="Opis prodajne prilike"
                value="description"
              />
            </CheckboxGroupField>
            <SelectField
              name="type"
              options={["1", "2"]}
              label="ID"
              className="sm:col-span-2"
            />
            <Input name="keywords" label="Oznake" className="sm:col-span-2" />
            <RadioGroupField
              name="filter"
              label="Pretraži prema"
              className="sm:col-span-2"
              direction="horizontal"
            >
              <RadioGroupField.Item label="Broju računa" value="number" />
              <RadioGroupField.Item label="Nazivu dobavljača" value="name" />
            </RadioGroupField>
            <AutocompleteField
              name="user"
              label="Korisnik"
              className="sm:col-span-3"
            />
            <AutocompleteField
              name="person"
              label="Odgovorne osobe"
              className="sm:col-span-3"
            />
            <SelectField
              name="text"
              options={["1", "2"]}
              label="Odluka korisnika"
              className="sm:col-span-6"
            />
          </div>
        </FormLayout.Section.Content>
        <FormLayout.Section.Actions
          leftActions={
            <div className="flex-shrink-0 mr-4 space-x-2">
              <Button variant="filled" color="gray">
                Dodatni filteri
              </Button>
            </div>
          }
        >
          <Button variant="outlined">Resetiraj filter</Button>
          <Button variant="filled">Pretraži</Button>
        </FormLayout.Section.Actions>
      </FormLayout.Section>
    </FormLayout>
   `,
  },
  {
    group: "Form Layout",
    name: "Contained",
    code: `
    <FormLayout type="card">
          <FormLayout.Section title="Osnovne informacije" subtitle="">
            <FormLayout.Section.Content>
              <div className="grid grid-cols-1 row-gap-6 col-gap-4 sm:grid-cols-6">
                <DateInputField
                  name="date"
                  label="Datum isporuke"
                  help="Datum treba odgovarati rasponu datuma na ugovoru"
                  className="sm:col-span-3"
                />
                <AutocompleteField
                  name="name"
                  label="Naziv korisnika"
                  className="sm:col-span-6"
                />
                <SelectField
                  name="currency"
                  label="Valuta"
                  disabled={true}
                  className="sm:col-span-3"
                  options={["USD", "HRK", "EUR"]}
                />
                <br />
                <TextareaField name="about" label="Napomena" className="sm:col-span-6" />
              </div>
            </FormLayout.Section.Content>
          </FormLayout.Section>
      </FormLayout>
   `,
  },
  {
    group: "Form Layout",
    name: "Contained And Filled",
    code: `
    <FormLayout type="full-width">
        <FormLayout.Section title="Osnovne informacije" subtitle="">
          <FormLayout.Section.Content>
            <div>
              <div className="pb-5 border-b border-gray-200">
                <RadioGroupField name="type" label="Tip putovanja" direction="vertical">
                  <RadioGroupField.Item
                    label="Terenski rad - Idem na rad kod korisnika u sklopu projekta"
                    value="rad"
                  />
                  <RadioGroupField.Item
                    label="Putni nalog - Idem na radionicu, konferenciju,edukaciju ili sales/presales sastanak, JobFair"
                    value="nalog"
                  />
                </RadioGroupField>
              </div>
              <div className= "border-b border-gray-200 pb-5 pt-5 grid grid-cols-2 gap-4">
                <AutocompleteField
                  name="project"
                  icon={<Icon type="info" />}
                  label="U sklopu kojeg projekta ideš na put?"
                  className="sm:col-span-1"
                />
              </div>
              <div className= "border-b border-gray-200 pb-5 pt-5 grid grid-cols-2 gap-4">
                <DateInputField name="date" label="Datum polaska na put" className="sm:col-span-1" />
              </div>
              <div className= "border-b border-gray-200 pb-5 pt-5 grid grid-cols-2 gap-4">
                <DateInputField name="date" label="Datum povratka s puta" className="sm:col-span-1" />
              </div>
              <div className= "border-b border-gray-200 pb-5 pt-5 grid grid-cols-2 gap-4">
                <AutocompleteField
                  name="project"
                  placeholder="Pronađi projekt"
                  icon={<Icon type="info" />}
                  label="U sklopu kojeg projekta ideš na put?"
                  className="sm:col-span-1"
                />
              </div>
              <div className= "border-b border-gray-200 pb-5 pt-5 grid grid-cols-2 gap-4">
                <AutocompleteField
                  name="city"
                  placeholder="Pronađi grad"
                  label="Iz kojeg grada krećeš na put?"
                  className="sm:col-span-1"
                />
              </div>
              <div className= "border-b border-gray-200 pb-5 pt-5 grid grid-cols-2 gap-4">
                <AutocompleteField
                  name="city"
                  label="U koji grad putuješ?"
                  placeholder="Pronađi grad"
                  className="sm:col-span-1"
                />
              </div>
              <div className= "border-b border-gray-200 pb-5 pt-5 grid grid-cols-2 gap-4">
                <InputField
                  name="reason"
                  label="Razlog (zadatak) putovanja"
                  icon={<Icon type="info" />}
                  className="sm:col-span-1"
                />
              </div>
              <div className="pb-5 pt-5">
                <RadioGroupField name="query" label="Je li potrebna organizacija puta?" direction="vertical">
                  <RadioGroupField.Item label="Da - želim da mi se organizira prijevoz i/ili smještaj" value="yes" />
                  <RadioGroupField.Item
                    label="Ne - sam ću se pobrinuti za organizaciju / organizacija nije potrebna"
                    value="no"
                  />
                </RadioGroupField>
              </div>
            </div>
          </FormLayout.Section.Content>
        </FormLayout.Section>
    </FormLayout>
   `,
  },
  {
    group: "Container",
    name: "Filter and Table",
    code: `
    <FormLayout type="card">
          <FormLayout.Section title="" subtitle="" borderless={false}>
            <FormLayout.Section.Content>
              <div className="grid grid-cols-1 row-gap-6 col-gap-4 sm:grid-cols-3">
                <InputField name="name" label="Ime" />
                <DateInputField name="date" label="Datum početka/kraja" />
                <SelectField name="type" options={["zaposlenik1", "zaposlenik2"]} label="Tip zaposlenika" />
              </div>
              <div className="inline-flex items-center space-x-1">
                <CheckboxField name="hide" label="Sakrij" />
              </div>
            </FormLayout.Section.Content>
          </FormLayout.Section>
      </FormLayout>
      <div className="mt-4">
        <Card isExpanded={true}>
          <Card.Body removeSpacing={true}>
            <DataTable data={[
    {
        "name": "Pero",
        "appliedFor": "Stalni zaposlenik",
        "datesBegin": "28. 08. 2021.",
        "datesEnd": "29. 09. 2021."
    },
    {
        "name": "Ivo",
        "appliedFor": "Vanjski suradnik 1",
        "datesBegin": "16. 08. 2021.",
        "datesEnd": "16. 09. 2021."
    },
    {
        "name": "Ana",
        "appliedFor": "Srednjoškolac",
        "datesBegin": "14. 08. 2021.",
        "datesEnd": "28. 09. 2021."
    },
    {
        "name": "Ivica",
        "appliedFor": "Vanjski suradnik 2",
        "datesBegin": "29. 08. 2021.",
        "datesEnd": "14. 09. 2021."
    }
    ]}>
    <DataTable.Column header="ZAPOSLENIK" accessor="name" />
    <DataTable.Column header="TIP ZAPOSLENIKA" accessor="appliedFor" />
    <DataTable.Column header="SLUŽBENI DATUM POČETKA" accessor="datesBegin" />
    <DataTable.Column header="SLUŽBENI DATUM ZAVRŠETKA" accessor="datesEnd" />
    </DataTable>
          </Card.Body>
          <Card.Footer type="pagination" />
        </Card>
      </div>
    `,
  },
  {
    group: "Container",
    name: "Steps Form",
    code: `
      <Card>
        <ProgressBar>
          <ProgressBar.Step active={false}>
            <span>STEP 1</span>
          </ProgressBar.Step>
          <ProgressBar.Step active={false}>
            <span>STEP 2</span>
          </ProgressBar.Step>
          <ProgressBar.Step active={true}>
            <span>STEP 3</span>
          </ProgressBar.Step>
          <ProgressBar.Step active={false}>
            <span>STEP 4</span>
          </ProgressBar.Step>
        </ProgressBar>
      </Card>
      <div className="mt-4">
        <FormLayout type="card">
            <FormLayout.Section title="Osnovne informacije" subtitle="">
              <FormLayout.Section.Content>
                <div className="grid grid-cols-1 row-gap-6 col-gap-4 sm:grid-cols-6">
                  <DateInputField
                    name="date"
                    label="Datum isporuke"
                    help="Datum treba odgovarati rasponu datuma na ugovoru"
                    className="sm:col-span-3"
                  />
                  <AutocompleteField
                    name="name"
                    label="Naziv korisnika"
                    className="sm:col-span-6"
                  />
                  <SelectField
                    name="currency"
                    label="Valuta"
                    disabled={true}
                    className="sm:col-span-3"
                    options={["USD", "HRK", "EUR"]}
                  />
                  <br />
                  <TextareaField name="about" label="Napomena" className="sm:col-span-6" />
                </div>
              </FormLayout.Section.Content>
            </FormLayout.Section>
        </FormLayout>
      </div>
      <div className="border-t border-gray-200 px-4 py-3 sm:px-6 mt-4" />
      <FormLayout type="card">
          <FormLayout.Section title="Prilozi" subtitle="">
            <FormLayout.Section.Content>
              <div className="flex justify-between w-full">
                <CheckboxField name="yesno" label="Dokumentacija je potpuna" />
                <Button>
                  Učitaj datoteke
                </Button>
              </div>
              <div className="px-4 py-5 sm:p-6" />
            </FormLayout.Section.Content>
          </FormLayout.Section>
      </FormLayout>
    `,
  },
];
