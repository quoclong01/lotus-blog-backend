# roles
role :app, %w(asiantech@172.16.110.189)

# ssh
set :ssh_options,
    port: 22,
    user: 'asiantech',
    keys: %w(~/.ssh/id_rsa),
    forward_agent: true,
    auth_methods: %w(publickey password)

# server
server '172.16.110.189',
    user: 'asiantech',
    roles: %w(app)