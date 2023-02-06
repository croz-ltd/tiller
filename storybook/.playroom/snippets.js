export default [
  {
    group: "Stacked Layout (Recommended Template)",
    name: "Customizable",
    code: `
          <StackedLayout navigation={
            <TopNavigation topRightAction={
                <TopNavigation.Dropdown
                buttonColor="primary"
                buttonVariant="text"
                icon={<Icon className="text-white" type="user"/>}
                iconColor="default"
                menuType="icon"
                popupBackgroundColor="default"
                title="User"
              >
                <TopNavigation.Navigation.SubItem to="/account">
                  <Intl name="account" />
                </TopNavigation.Navigation.SubItem>
                <TopNavigation.Navigation.SubItem to="/support">
                  <Intl name="support" />
                </TopNavigation.Navigation.SubItem>
                <TopNavigation.Navigation.SubItem to="/logout">
                  <Intl name="signOut" />
                </TopNavigation.Navigation.SubItem>
              </TopNavigation.Dropdown>
            }>
              <TopNavigation.Navigation>
                <TopNavigation.Navigation.Item to="/dashboard">
                  Dashboard
                </TopNavigation.Navigation.Item>
                <TopNavigation.Navigation.Item to="/team">
                  Team
                </TopNavigation.Navigation.Item>
                <TopNavigation.Navigation.Item to="/projects">
                  Projects
                </TopNavigation.Navigation.Item>
                <TopNavigation.Navigation.Item to="/calendar">
                  Calendar
                </TopNavigation.Navigation.Item>
                <TopNavigation.Navigation.Item
                  isExpandable
                  title="Planning"
                >
                  <TopNavigation.Navigation.SubItem
                    icon={<Icon type="clipboard" />}
                    onSelect={function noRefCheck(){}}
                    to="/tasks"
                  >
                    Tasks
                  </TopNavigation.Navigation.SubItem>
                  <TopNavigation.Navigation.SubItem
                    onSelect={function noRefCheck(){}}
                    to="/reminders"
                  >
                    Reminders
                  </TopNavigation.Navigation.SubItem>
                  <TopNavigation.Navigation.SubItem
                    onSelect={function noRefCheck(){}}
                    to="/events"
                  >
                    Events
                  </TopNavigation.Navigation.SubItem>
                </TopNavigation.Navigation.Item>
              </TopNavigation.Navigation>
            </TopNavigation>
          }>
            <StackedLayout.Heading>
                <PageHeading>
                  <PageHeading.Title>Project Nero</PageHeading.Title>
                  <PageHeading.Actions>
                    <Button variant="outlined">
                      Edit
                    </Button>
                     <Button variant="filled">
                      Publish
                    </Button>
                  </PageHeading.Actions>
                </PageHeading>
            </StackedLayout.Heading>
            <StackedLayout.Content>
              <Placeholder className="h-48" />
            </StackedLayout.Content>
          </StackedLayout>
   `,
  },
  {
    group: "Sidebar Layout (Recommended Template)",
    name: "Customizable",
    code: `
          <SidebarLayout navigation={
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
                    icon={<Icon type="user" className="text-white" />}
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
                <SidebarNavigation.Item to="/projects">Projects</SidebarNavigation.Item>
                <SidebarNavigation.Item to="/calendar">Calendar</SidebarNavigation.Item>
                <SidebarNavigation.Item to="/reports">Reports</SidebarNavigation.Item>
            </SidebarNavigation>
          }>
            <SidebarLayout.Heading>
              <PageHeading>
                <PageHeading.Title>
                 Title
                </PageHeading.Title>
              </PageHeading>
            </SidebarLayout.Heading>
            <SidebarLayout.Content>
              <Placeholder className="h-48" />
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
          <Badge color="primary">
              Badge
          </Badge>
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
          <IconButton icon={<Icon type="pencil-simple" variant="light" className="text-gray-500" />} label="Edit" />
          <IconButton icon={<Icon type="trash" variant="light" className="text-gray-500" />} label="Delete" />
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
           <InputField name="input" label="Name:" placeholder="" help="" hint="" />
    `,
  },
  {
    group: "Input",
    name: "Date Input",
    code: `
          <DateInputField name="dateInput" label="Date:" placeholder="" help="" hint="" />

`,
  },
  {
    group: "Input",
    name: "Select Input",
    code: `
          <SelectField
            name="test"
            options={["Pero", "Ivo", "Ana", "Ivica"]}
            name="nameWithArray"
            allowMultiple={true}
            label="Employee:"
          />
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
          <TreeSelectField name="treeSelectInput" label="Type:"  options={["Pero", "Ivo", "Ana", "Ivica"]} placeholder="" help="" hint="" />   
`,
  },
  {
    group: "Icon",
    name: "Customizable",
    code: `
          <Icon type="dog" variant="fill" />   `,
  },
  {
    group: "Top Navigation",
    name: "Customizable",
    code: `
          <TopNavigation logo={<svg width="36" height="32" viewBox="0 0 36 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M15.4844 28.4376C15.679 27.9367 15.7717 27.4021 15.7573 26.865C15.7869 25.3764 16.1848 23.9184 16.9153 22.621C17.644 21.3258 18.6831 20.2321 19.9393 19.438C20.4044 19.1885 20.8141 18.8473 21.1435 18.4349C21.4729 18.0225 21.7153 17.5476 21.8559 17.0389C21.9965 16.5301 22.0324 15.9982 21.9615 15.4751C21.8906 14.9521 21.7143 14.4489 21.4433 13.996C21.0813 13.391 20.5603 12.895 19.9393 12.565C19.5833 12.318 19.2413 12.052 18.9153 11.767L18.0983 10.967C16.6012 9.3932 15.7617 7.30708 15.7513 5.135C15.7667 4.59777 15.6744 4.06288 15.4799 3.56188C15.2853 3.06089 14.9923 2.60395 14.6183 2.218C14.2459 1.83249 13.7997 1.52595 13.3062 1.31668C12.8128 1.10742 12.2823 0.999714 11.7463 1C11.2106 1.00076 10.6805 1.10894 10.1874 1.31815C9.69424 1.52735 9.24808 1.83334 8.87527 2.218C8.50189 2.60462 8.20937 3.06183 8.01483 3.56287C7.82029 4.06391 7.72763 4.59872 7.74227 5.136C7.751 5.83344 7.9431 6.5163 8.29927 7.116C8.65421 7.71469 9.16096 8.20902 9.76827 8.549C12.2273 10.105 13.9383 13.08 13.9383 16.006C13.9322 18.1592 13.1087 20.2298 11.6343 21.799L9.77427 23.451C9.16727 23.79 8.66027 24.284 8.30427 24.884C7.94727 25.483 7.75627 26.167 7.74727 26.865C7.73197 27.4022 7.82434 27.9371 8.01892 28.438C8.2135 28.939 8.50637 29.396 8.88027 29.782C9.2527 30.1674 9.69894 30.4739 10.1924 30.6832C10.6858 30.8924 11.2163 31.0002 11.7523 31C12.2881 30.9994 12.8184 30.8913 13.3117 30.682C13.805 30.4728 14.2513 30.1668 14.6243 29.782C14.9975 29.3955 15.2899 28.9384 15.4844 28.4376Z" fill="#6366F1"/>
  <path d="M20.9163 7.36C20.4753 6.698 20.2403 5.919 20.2403 5.123C20.2409 4.05673 20.6633 3.034 21.4153 2.278C22.0691 1.62024 22.9314 1.2105 23.8543 1.11909C24.7772 1.02768 25.7031 1.26028 26.4733 1.777C27.1329 2.2199 27.6466 2.84836 27.9493 3.583C28.252 4.31848 28.331 5.12692 28.1765 5.9071C28.0219 6.68728 27.6406 7.40452 27.0803 7.969C26.5217 8.53193 25.808 8.91563 25.0304 9.07112C24.2527 9.22661 23.4464 9.14685 22.7143 8.842C21.9815 8.53685 21.3557 8.02107 20.9163 7.36Z" fill="#6366F1"/>
  <path d="M22.0213 23.518C22.6803 23.076 23.4553 22.84 24.2473 22.84V22.838C24.7737 22.8386 25.2949 22.9432 25.7809 23.1457C26.2669 23.3482 26.7081 23.6446 27.0793 24.018C27.7352 24.6779 28.1432 25.544 28.2343 26.47C28.3254 27.3959 28.094 28.3249 27.5793 29.1C27.1399 29.762 26.5137 30.2785 25.7803 30.584C25.0482 30.8888 24.2418 30.9686 23.4642 30.8131C22.6865 30.6576 21.9729 30.2739 21.4143 29.711C20.8538 29.1464 20.4723 28.429 20.3178 27.6486C20.1632 26.8683 20.2423 26.0596 20.5453 25.324C20.848 24.5894 21.3616 23.9609 22.0213 23.518Z" fill="#6366F1"/>
  <path d="M33.8243 13.758C34.2641 14.4198 34.4991 15.1974 34.4993 15.9931C34.4986 17.0597 34.0762 18.0827 33.3243 18.839C32.953 19.2122 32.5118 19.5086 32.0258 19.7111C31.5398 19.9136 31.0187 20.0182 30.4923 20.019C29.6994 20.019 28.9245 19.783 28.2663 19.341C27.6066 18.8981 27.093 18.2696 26.7903 17.535C26.4873 16.7994 26.4082 15.9907 26.5628 15.2104C26.7173 14.43 27.0988 13.7126 27.6593 13.148C28.2179 12.5849 28.9318 12.2011 29.7096 12.0456C30.4875 11.8901 31.294 11.9699 32.0263 12.275C32.7592 12.5804 33.385 13.0966 33.8243 13.758Z" fill="#6366F1"/>
  <path d="M3.28026 12.647C3.93926 12.205 4.71326 11.969 5.50626 11.969C6.03261 11.9701 6.55357 12.075 7.03934 12.2776C7.52511 12.4803 7.96617 12.7767 8.33726 13.15C8.99287 13.8097 9.40068 14.6754 9.49178 15.601C9.58288 16.5265 9.35169 17.4552 8.83726 18.23C8.39793 18.8914 7.77217 19.4075 7.03926 19.713C6.3069 20.0164 5.50093 20.0953 4.72361 19.9399C3.94629 19.7845 3.23266 19.4017 2.67326 18.84C2.11296 18.2755 1.73165 17.5583 1.57708 16.7781C1.4225 15.9979 1.50153 15.1895 1.80426 14.454C2.10685 13.719 2.62048 13.0902 3.28026 12.647Z" fill="#6366F1"/>
  </svg>} topRightAction={
              <TopNavigation.Dropdown
              title="User"
              menuType="icon"
              icon={<Icon type="user" className="text-white" />}
              popupBackgroundColor="default"
              iconColor="default"
              buttonColor="primary"
              buttonVariant="text"
            >
              <TopNavigation.Dropdown.Item to="/account">Account</TopNavigation.Dropdown.Item>
              <TopNavigation.Dropdown.Item to="/support">Support</TopNavigation.Dropdown.Item>
              <TopNavigation.Dropdown.Item to="/logout">SignOut</TopNavigation.Dropdown.Item>
            </TopNavigation.Dropdown>
          }>
            <TopNavigation.Navigation>
              <TopNavigation.Navigation.Item to="/dashboard">Dashboard</TopNavigation.Navigation.Item>
              <TopNavigation.Navigation.Item to="/team">Team</TopNavigation.Navigation.Item>
              <TopNavigation.Navigation.Item to="/projects">Projects</TopNavigation.Navigation.Item>
              <TopNavigation.Navigation.Item to="/calendar">Calendar</TopNavigation.Navigation.Item>
            </TopNavigation.Navigation>
          </TopNavigation>
   `,
  },
  {
    group: "Form Layout",
    name: "Filter",
    code: `
          <FormLayout type="card">
            <FormLayout.Section title="" subtitle="" borderless={false}>
              <FormLayout.Section.Content>
                <div className="grid grid-cols-1 row-gap-6 gap-4 sm:grid-cols-3">
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
                <div className="grid grid-cols-1 row-gap-6 gap-4 sm:grid-cols-6">
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
                <div className="grid grid-cols-1 row-gap-6 gap-4 sm:grid-cols-6">
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
                <div className="grid grid-cols-1 row-gap-6 gap-4 sm:grid-cols-3">
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
                  ]}
                >
                  <DataTable.Column header="ZAPOSLENIK" accessor="name" />
                  <DataTable.Column header="TIP ZAPOSLENIKA" accessor="appliedFor" />
                  <DataTable.Column header="SLUŽBENI DATUM POČETKA" accessor="datesBegin" />
                  <DataTable.Column header="SLUŽBENI DATUM ZAVRŠETKA" accessor="datesEnd" />
                </DataTable>
              </Card.Body>
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
                    <div className="grid grid-cols-1 row-gap-6 gap-4 sm:grid-cols-6">
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
