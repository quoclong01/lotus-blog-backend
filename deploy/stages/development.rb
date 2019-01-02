# roles
role :app, %w(deploy@172.16.110.150)

# ssh
set :ssh_options,
    port: 22,
    user: 'deploy',
    keys: %w(~/.ssh/id_rsa),
    forward_agent: true,
    auth_methods: %w(publickey password)

# server
server '172.16.110.150',
    user: 'deploy',
    roles: %w(app)